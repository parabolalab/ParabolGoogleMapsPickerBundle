<?php 

namespace Parabol\GoogleMapsPickerBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormBuilderInterface;


class GoogleMapsPickerType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lat', \Symfony\Component\Form\Extension\Core\Type\HiddenType::class)
            ->add('lng', \Symfony\Component\Form\Extension\Core\Type\HiddenType::class)
        ;
    }

	public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
                'scriptUrl' => null,
                'initLatLng' => [0,0],
                'initWithMarker' => true,
                'showLabel' => false,
                'mapOptions' => [],
                'addresField' => null
        ));
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);

        if(!$options['showLabel']) $view->vars['label'] = ' ';
        $view->vars['initLatLng'] = $view->vars['data'] ? array_values($view->vars['data']) : $options['initLatLng'];
        $view->vars['scriptUrl'] = $options['scriptUrl'];
        $view->vars['initWithMarker'] = $options['initWithMarker'];
        $view->vars['addresField'] = $options['addresField'] ? $options['addresField'] : 'form_address';
        $view->vars['mapOptions'] = json_encode($options['mapOptions']);
       
        
    }

    public function getBlockPrefix()
    {
        return 'parabol_google_maps_picker';
    }
}
<?php

namespace Parabol\GoogleMapsPickerBundle\Entity\Base;

use Doctrine\ORM\Mapping as ORM;

trait Coordinates {

	 /**
      * @ORM\Column(name="coordinates", type="array", nullable=true)
      */
     public $coordinates;

     /**
     * Set coordinates
     *
     * @param array $coordinates
     *
     * @return Aparthotel
     */
    public function setCoordinates(array $coordinates)
    {
        $this->coordinates = $coordinates;

        return $this;
    }

    /**
     * Get coordinates
     *
     * @return \json
     */
    public function getCoordinates()
    {
        return $this->coordinates;
    }
}
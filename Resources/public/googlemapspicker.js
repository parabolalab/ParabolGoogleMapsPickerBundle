class GoogleMapPicker {
   
    constructor({ mapId = 'map_canvas', initLatLng = [0,0], coordsInputsPrefix = '', addressField = 'form_address',  initWithMarker = true, initWithRefreshMarker = false, mapOptions = { }, markers = [] } = {} ){
      
      this.mapId = mapId
      this.marker = null;
      this.markers = [];
      this.dragEvent = null;
      this.coordsInputsPrefix = coordsInputsPrefix;
      this.addressField = addressField
      this.mapOptions = Object.assign({}, {zoom: 6, center: this.createLatLng(initLatLng[0], initLatLng[1]), streetViewControl: false, scrollwheel: false }, mapOptions)
      this.init(initWithMarker);
      this.setMarkers(markers)
      this.queryString = '';
      this.request = null;

      
      document.querySelectorAll( this.addressField ).forEach( (item) => {

      item.onkeyup = (e) => {

        console.log('onkeyup');
       
         this.applyLatLagByAddress(e.target.value);

         // if(e.target.value)
         // {
         //    this.applyLatLagByAddress(e.target.value);
         // }
      }

      if(initWithRefreshMarker)
      {
          item.dispatchEvent(new Event('keyup'))
      }
    })
      
      
    }

    init(initWithMarker)
    {
          this.map = new google.maps.Map(document.getElementById(this.mapId), this.mapOptions);
          
          if(initWithMarker) this.insertMarker(this.mapOptions.center)

          google.maps.event.addListener(this.map, 'click', function(event) {
               this.insertMarker(event.latLng)
             
          }.bind(this));
    }

    createLatLng(lat, lng)
    {
      return new google.maps.LatLng(lat, lng)
    }

    createMarker(latLng)
    {
      return new google.maps.Marker({
            position: latLng,
            map: this.map,
            draggable: true,
            flat: true,
            mapId: this.mapId
          });
    }

    insertMarker(latLng)
    {

         if(this.marker){
             if(this.dragEvent) google.maps.event.removeListener(this.dragEvent);
             this.marker.setMap(null);
         }

         this.marker = this.createMarker(latLng)
          
         //  change = true;

          this.setCoordinates(latLng);

          this.dragEvent = google.maps.event.addListener(this.marker, 'mouseup', function() {
                this.setCoordinates(this.marker.getPosition());
          }.bind(this));


          return this.marker
    }

    setMarkers(markers)
    {
      // let latLngBounds = new google.maps.LatLngBounds();

      // markers.forEach((marker, i)  => {
        
      //   if(typeof marker.filters == 'object' && (marker.filters.status == '' || marker.filters.status == marker.status))
      //   {
      //          this.markers.push(new google.maps.Marker({
      //                   position: latlng,
      //                   map: map,
      //                   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|' + ( marker.status == 'online' ? '1ecb5f' : 'fd3362') + '|ffffff',
      //                   name: marker.name,
      //                   url: marker.url
      //               }));

               
      //           google.maps.event.addListener(marker, 'click', function(e) {
                        
      //                   infowindow.setContent('<h2 style="font-size: 110%">'+this.name+'</h2><a href="'+this.url+'">'+globalMarker.button.label+'</a>');
                        
                        
      //                   infowindow.open(this.map, this.map);
                    
      //           }.bind(this));
           
      //     latLngBounds.extend(latlng)
      //   }

      //   if(typeof markers[i] == 'undefined') this.map.fitBounds(latLngBounds);

      // })

      

    }

    setCoordinates(latLng)
    {
          let latInput = document.getElementById(this.coordsInputsPrefix + 'lat')
          let lngInput = document.getElementById(this.coordsInputsPrefix + 'lng')
         if(latInput && lngInput){
            latInput.value = latLng.lat()
            lngInput.value = latLng.lng()
         }
         
    }

    applyLatLagByAddress(address)
    {
        let query = ''
        document.querySelectorAll(this.addressField).forEach((item) => {
            if(item.value)
            {
              query += (query ? ', ' : '') + item.value
            } 
        })

        if(this.request) clearTimeout(this.request);

        this.request = setTimeout(() => {

             let geocoder = new google.maps.Geocoder();

              geocoder.geocode({ 'address': address },  (results, status) => {

                  if (status == google.maps.GeocoderStatus.OK) {
                      if(typeof results[0].geometry.bounds != 'undefined') this.map.fitBounds(results[0].geometry.bounds)
                      else 
                      {
                        this.map.setCenter(results[0].geometry.location);
                        this.map.setZoom(17)
                      }
                      this.insertMarker(results[0].geometry.location)

                  }

                  
              });
        }, 1000)
       
    }
}


// var geocoder = new google.maps.Geocoder();
//         var address = 'Kraków'
//         //document.getElementById('textboxid').value;

//         geocoder.geocode({ 'address': address }, function (results, status) {


//             if (status == google.maps.GeocoderStatus.OK) {
//                 var latitude = results[0].geometry.location.lat();
//                 var longitude = results[0].geometry.location.lng();

//             }

//             console.log(results, latitude, longitude)
//         });

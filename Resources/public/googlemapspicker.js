class GoogleMapPicker {
   
    constructor({ mapId = 'map_canvas', initLatLng = [0,0], coordsInputsPrefix = '', addresField = 'form_address',  initWithMarker = true, mapOptions = { }, markers = [] } = {} ){
      
      this.mapId = mapId
      this.marker = null;
      this.markers = [];
      this.dragEvent = null;
      this.coordsInputsPrefix = coordsInputsPrefix;
      this.addresField = addresField
      this.mapOptions = Object.assign({}, {zoom: 6, center: this.createLatLng(initLatLng[0], initLatLng[1]), streetViewControl: false, scrollwheel: false }, mapOptions)
      this.init(initWithMarker);
      this.setMarkers(markers)

      if(document.getElementById(this.addresField ))
      { 
        document.getElementById(this.addresField ).onkeyup = (e) => {
           if(e.target.value)
           {
              this.applyLatLagByAddress(e.target.value);
           }
        }
      }
      else if(document.getElementById('edit_' + this.addresField ))
      { 
        document.getElementById('edit_' + this.addresField ).onkeyup = (e) => {
           if(e.target.value)
           {
              this.applyLatLagByAddress(e.target.value);
           }
        }
      }
      else if(document.getElementById('new_' + this.addresField ))
      {
        document.getElementById('new_' + this.addresField ).onkeyup = (e) => {
           if(e.target.value)
           {
              this.applyLatLagByAddress(e.target.value);
           }
        }
      }
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
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address }, function (results, status) {

            console.log(this)

            if (status == google.maps.GeocoderStatus.OK) {
                
                this.map.setCenter(results[0].geometry.location);
                this.insertMarker(results[0].geometry.location)

            }

            
        }.bind(this));
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

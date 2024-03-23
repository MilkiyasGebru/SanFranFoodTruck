function initMap() {
    const sfCoords = { lat: 37.7749, lng: -122.4194 };
    // const personCoords = {lat: 37.7749, lng: -122.419}

    let markers = [];
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: sfCoords,
    });
    let personMarker = new google.maps.Marker({
                position : sfCoords,
                map : map,
                icon: {
                url: "http://maps.gstatic.com/mapfiles/ms2/micons/man.png",
                scaledSize: new google.maps.Size(50, 50),
            },
            title: "Car",
            })
    map.addListener('click' ,(event)=>{

        clearMarkers();
        personMarker = new google.maps.Marker({
                position : {lat: event.latLng.lat(), lng:event.latLng.lng()},
                map : map,
                icon: {
                url: "http://maps.gstatic.com/mapfiles/ms2/micons/man.png",
                scaledSize: new google.maps.Size(50, 50),
            },
            title: "Car",
            });
        markers.push(personMarker)
        fetchMarkers()
        console.log(len(markers))
    })


    markers.push(personMarker)
    const clearMarkers = ()=>{
        markers.forEach(marker =>{
            marker.setMap(null);
        })
        markers = [];
    }



    const fetchMarkers = ()=> {
        console.log(personMarker, " This is the personMarker")
        fetch('http://127.0.0.1:8000/getClosest/'+personMarker.position.lat()+'/'+personMarker.position.lng())
            .then(response => {
                console.log("I am over here")
                return response.json()
            }).then(response => {
            return JSON.parse(response)
        }).then(trucks => {
            // console.log(trucks.length)

            trucks.forEach((truck) => {
                // console.log(truck, " This is the truck")
                const truckMarker = new google.maps.Marker({
                    position: {lat: truck.Latitude, lng: truck.Longitude},
                    map: map,
                    icon: {
                        url: "http://maps.gstatic.com/mapfiles/ms2/micons/truck.png",
                        scaledSize: new google.maps.Size(50, 50),
                    },
                    title: "Car",
                })
                markers.push(truckMarker)
                truckMarker.addListener("click", () => {

                    window.location.href = "/truck/" + truck.locationid;
                });
            })
        }).catch(
            e => {
                console.log("Error occured ", e)
            }
        )
    }

    fetchMarkers()



    // Find current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Add marker for current location
            const userMarker = new google.maps.Marker({
                position: userCoords,
                map,
                title: "Your Location",
            });

            // Center map on current location
            map.setCenter(sfCoords);
        });
    }
}
function initMap() {
    const sfCoords = { lat: 37.7749, lng: -122.4194 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: sfCoords,
    });

    // Add marker with car icon
    // const carMarker = new google.maps.Marker({
    //     position: sfCoords,
    //     map,
    //     icon: {
    //         url: "http://maps.google.com/mapfiles/kml/shapes/car.png",
    //         scaledSize: new google.maps.Size(50, 50),
    //     },
    //     title: "San Francisco",
    // });
    //
    // // Add click event listener to marker
    // carMarker.addListener("click", () => {
    //     // Change marker icon on click
    //     console.log("I have been clicked ")
    //     carMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
    // });

    const carPositions = [
        { lat: 37.775, lng: -122.4194 },
        { lat: 37.776, lng: -122.42 },
        { lat: 37.777, lng: -122.421 },
        { lat: 37.778, lng: -122.422 },
        { lat: 37.779, lng: -122.423 },
        { lat: 37.780, lng: -122.424 },
        { lat: 37.781, lng: -122.425 },
        { lat: 37.782, lng: -122.426 },
        { lat: 37.783, lng: -122.427 },
        { lat: 37.784, lng: -122.428 }
    ];

    // Add car markers to the map
    carPositions.forEach((position) => {
        const carMarker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
                url: "http://maps.gstatic.com/mapfiles/ms2/micons/truck.png",
                scaledSize: new google.maps.Size(50, 50),
            },
            title: "Car",
        });

        // Add click event listener to marker
        carMarker.addListener("click", () => {
            // Change marker icon on click
            carMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/blue-dot.png");
            // window.location.href = "{% url 'getTruck' %}";
            window.location.href = "/truck";
        });
    });


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
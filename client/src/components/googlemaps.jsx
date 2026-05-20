export default function GoogleMaps({ className , size }) {

    return (
        <div className={className}>
        <iframe
          width="100%"
          height="100%"
          className={size}
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBMcB7BUE0pjhCr9meRESVzuyn3zqxxROw&q=Naan+Auto+4327+Gulf+Breeze+Pkwy+Gulf+Breeze+FL"
          allowFullScreen
        />
      </div>
    );
}



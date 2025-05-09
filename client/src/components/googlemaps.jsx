export default function GoogleMaps({ className , size }) {

    return (
        <div className={className}>
        <iframe
          width="100%"
          height="100%"
          className={size}
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=???&q=place_id:ChIJ61gCy5iVkIgRbB7xpqp-zK4"
          allowFullScreen
        />
      </div>
    );
}



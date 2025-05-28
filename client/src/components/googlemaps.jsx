export default function GoogleMaps({ className , size }) {

    return (
        <div className={className}>
        <iframe
          width="100%"
          height="100%"
          className={size}
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBMcB7BUE0pjhCr9meRESVzuyn3zqxxROw&q=place_id:ChIJK-qNZF3bkIgReFC0ERD-WfY"
          allowFullScreen
        />
      </div>
    );
}



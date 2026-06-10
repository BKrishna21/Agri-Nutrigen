type Props = {

  lat: number | null;

  lng: number | null;
};



export default function CoordinateCard({
  lat,
  lng
}: Props) {

  return (

    <div className="bg-white rounded-3xl shadow-md p-6 border border-green-100">

      <h2 className="text-2xl font-bold text-green-900 mb-4">
        Selected Coordinates
      </h2>

      {lat && lng ? (

        <div className="space-y-2">

          <p className="text-gray-700">
            <span className="font-bold">
              Latitude:
            </span>

            {" "}

            {lat}
          </p>

          <p className="text-gray-700">

            <span className="font-bold">
              Longitude:
            </span>

            {" "}

            {lng}
          </p>

        </div>

      ) : (

        <p className="text-gray-500">
          Click on the map to select location.
        </p>
      )}

    </div>
  );
}
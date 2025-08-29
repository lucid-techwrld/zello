type NotificationsProp = {
  msg: string;
  time: string;
  link: string;
};

const NotificationCard: React.FC<NotificationsProp> = ({ msg, time, link }) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex flex-col md:flex-1">
        <h1 className="text-blue-600 font-semibold text-base md:text-lg mb-1">
          🏡 New Property Alert!
        </h1>
        <p className="text-gray-700 text-sm md:text-base">{msg}</p>
        <a
          href={link}
          className="text-blue-500 text-sm md:text-base mt-2 hover:underline"
        >
          View property
        </a>
      </div>

      <span className="text-xs md:text-sm text-gray-500 mt-2 md:mt-0 md:ml-4">
        {time}
      </span>
    </div>
  );
};

export default NotificationCard;

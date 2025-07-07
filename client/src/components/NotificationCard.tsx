type NotificationsProp = {
  msg: string;
  time: string;
  link: string;
};
const NotificationCard: React.FC<NotificationsProp> = ({ msg, time, link }) => {
  return (
    <div className="w-full h-auto mt-4">
      <div className="w-full flex justify-between items-center bg-white text-xl font-bold">
        <h1 className="text-blue-500">🏡New Property Alert!</h1>
        <span>{time}</span>
      </div>
      <div>
        <p>{msg}</p>
        <a href={link} className="text-blue-500 hover:underline">
          View property
        </a>
      </div>
    </div>
  );
};

export default NotificationCard;

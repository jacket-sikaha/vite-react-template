import { useNavigate } from "react-router-dom";

const ListItem = (props: { item: any }) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <div className="py-2 border-b">
      <div className="flex flex-row mb-3">
        <div className="mr-5">
          <span className="mr-2">ID:</span>
          <span className="text-indigo-700">{item.id}</span>
        </div>
        <div className="mr-5">
          <span className="mr-2">标题:</span>
          <span className="text-indigo-700">{item.title}</span>
        </div>
      </div>
      <div className="flex flex-row mb-2">
        <span className="mr-2">内容:</span>
        <span className="text-indigo-700 mr-2">{item.body}</span>
      </div>
    </div>
  );
};

export { ListItem };

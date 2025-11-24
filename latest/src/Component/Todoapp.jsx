import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const Todoapp = () => {
  const [items, Setitems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React js", checked: false },
  ]);

  const [newitem, Setnewitem] = useState("");
  const [isediting, Setediting] = useState(false);
  const [currentelement, Setcurrentelement] = useState(null);

  let handlecheck = (id) => {
    let listitems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    Setitems(listitems);
  };

  let handleaddorsaveItem = () => {
    if (isediting) {
      let newlistitem = items.map((item) => {
        return item.id === currentelement ? { ...item, label: newitem } : item;
      });
      Setitems(newlistitem);
      Setcurrentelement(null);
      Setnewitem("");
      Setediting(false);
    } else {
      Setitems([
        ...items,
        { id: items.length + 1, label: newitem, checked: false },
      ]);
    }
  };
  let handleupdate = (id) => {
    let listitem2 = items.find((item) => item.id === id);
    Setnewitem(listitem2.label);
    Setediting(true);
    Setcurrentelement(id);
  };

  ///delete this key  using key method
  let handledelete = (id) => {
    let newdelete = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        ///This map is used
        return { ...item, id: index + 1 };
      });
    Setitems(newdelete);
  };

  return (
    <main>
      <div>
        <input
          type="text"
          value={newitem}
          placeholder="Enter the task"
          onChange={(e) => {
            Setnewitem(e.target.value);
          }}
        />
        <button onClick={handleaddorsaveItem}>
          {isediting ? "Save" : "add"}{" "}
        </button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {
                  handlecheck(item.id);
                }}
              />
              <label>{item.label}</label>
              <FaRegEdit
                role="button"
                tabIndex={0}
                onClick={() => handleupdate(item.id)}
              />
              <FaTrashAlt
                role="button"
                tabIndex={0}
                onClick={() => handledelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default Todoapp;

import "./groups.scss";

const Groups = ({groups, setGroups}) => {

  function handleClick() {
    let collection = prompt("Enter New Group Name:");
    if (collection !== null && collection !== "") {
      setGroups([...groups,  {key: groups.length + 1, label: collection, members: 1, img: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg"}]);
    } 
  }

  return (
    <div className="groups">
      <div className="title">
        Your Groups
      </div>
      
      <div className="container">
        {groups.map((group)=> (
          <div className="group" key={group.key}>
            <img src={group.img} alt="" />
            <p className="p1">{group.label}</p>
            <p className="p2">{group.members}</p>
          </div>
        ))}
        <div className="plusDiv">
            <div className="plus" onClick={()=>{handleClick()}}><p>+</p></div>
          </div>
      </div>
    </div>
  );
};

export default Groups;
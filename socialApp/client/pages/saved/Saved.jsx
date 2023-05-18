import "./saved.scss";

const Saved = ({saved, setSaved}) => {
  
  function handleClick() {
    let collection = prompt("Enter New Collection Name:");
    if (collection !== null && collection !== "") {
      setSaved([...saved, {key: saved.length + 1, label: collection, img1: "", img2: "", img3: "", img4: ""}]);
    } 
  }

  return (
    <div className="saved">
      <div className="title">
        Saved Posts
      </div>
      
      <div className="container">
          {saved && saved.map((item) => (
            <div className="content" key={item.key}>
              <div className="item">
                <div className="first">
                  <div className="img">
                    <img alt="" src={item.img1}/>
                  </div>
                  <div className="img">
                    <img alt="" src={item.img2}/>
                  </div>
                  </div> 
                <div className="second">
                  <div className="img">
                    <img alt="" src={item.img3}/>
                  </div>
                  <div className="img">
                    <img alt="" src={item.img4}/>
                  </div>
                </div> 
              </div>
              <div className="bottom">{item.label}</div>
            </div>
          ))}
          <div className="plusDiv">
            <div className="plus" onClick={()=>{handleClick()}}><p>+</p></div>
          </div>
      </div>
      
    </div>
  );
};

export default Saved;
<div>
  Default:
  <br />
  <InfoHelper content={"Hey I'm some helpful info!"} />
  <br />
  As different icon:
  <br />
  <InfoHelper icon="align-left" content={"Hey I'm some helpful info!"} />
  <br />
  As Button:
  <br />
  <InfoHelper isButton text="Hello world!" icon="align-left" content={"Hey I'm some helpful info!"} />
  <br />
  size=45
  <br />
  <InfoHelper size={45} content={"Hey I'm some helpful info!"} />
  <br />
  isPopover=true
  <br />
  <InfoHelper isPopover content={"Hey I'm some helpful info!"} />
  <br />
  isPopover=true size=30 (doesn't work)
  <br />
  <InfoHelper size={30} isPopover content={"Hey I'm some helpful info!"} />
  <br />
  absolute positioned!
  <br />
  <InfoHelper
    className={"pt-large"}
    isPopover
    content={"Hey I'm some helpful info!"}
  />
  <br />
  <div style={{position: "relative", height: 300, width: 300, background: "lightgrey"}}>
    <InfoHelper content={"Hey I'm some helpful info!"}  style={{position: "absolute", right: 0, bottom: 0}}>

    </InfoHelper>
  </div>
</div>;

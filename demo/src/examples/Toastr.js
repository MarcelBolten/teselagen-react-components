

function Demo() {
  return (
    <div>
      <Button onClick={() => {
        window.toastr.success("heyy")
      }} text="show toast" />
    </div>
  );
}

render(Demo);
import React from "react";

function DeleteAll({ check, deleteAll, checkAll }) {
  return (
    <>
      <input type="checkbox" checked={check} onChange={(e) => checkAll(e)} />
      <button onClick={deleteAll}>Delete All</button>
    </>
  );
}

export default DeleteAll;

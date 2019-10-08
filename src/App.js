import React from "react";
import Dictionary from "./Dictionary/Dictionary";
import ListOfDictionaries from "./ListOfDictionaries/ListOfDictionaries";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faPen, faTrash);

function App() {
  return (
    <div>
        <Dictionary />
        <ListOfDictionaries />
    </div>
  );
}

export default App;

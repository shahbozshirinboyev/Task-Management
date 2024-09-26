// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// react-beautiful-dnd endi faol ravishda yangilanmayapti. Shuning uchun sizning loyihangiz uchun yaxshi alternativ kutubxona - @hello-pangea/dnd deb nomlanadi. U eski kutubxonaning forki bo‘lib, faol tarzda yangilanmoqda. Siz react-beautiful-dnd o'rniga ushbu kutubxonani sinab ko'rishingiz mumkin.
// npm install @hello-pangea/dnd

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


import { useState } from "react";
import { Board } from "../../data/board";
import { onDragEnd } from "../../helpers/onDragEnd";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

function Home() {
  const [columns, setColumns] = useState(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    <div
                      onClick={() => openModal(columnId)}
                      className="flex cursor-pointer items-center md:w-[290px] w-[250px] justify-center gap-1 py-[10px] opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                    >
                      <i className="bi bi-plus-circle-dotted"></i>
                      Add Task
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <Task provided={provided} task={task} />
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
}

export default Home;

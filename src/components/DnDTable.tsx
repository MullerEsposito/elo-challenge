import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { updateLeadStatusController } from "../modules/leads/controllers/UpdateLeadStatusController";
import { ILead } from "../modules/leads/types";

interface IDnDTable {
  leads: ILead[];
  setLeads: Dispatch<SetStateAction<ILead[]>>;
}

export function DnDTable({ leads, setLeads }: IDnDTable): JSX.Element {

  const handleOnDragEnd = ({ source, destination }: DropResult) => {      
    if (!destination) return;
    const idLeadToUpdate = source.droppableId;
    const idxNewStatus = destination.index;
    
    const response = updateLeadStatusController({ 
      leads, 
      idLeadToUpdate, 
      idxNewStatus 
    });

    if (response.content) {
      const newLeads = response.content;
      setLeads(newLeads);
    }      
  };

  return (
    <TableContainer  overflowX={["scroll", "scroll", "hidden"]}>
      <Table 
        variant={"striped"} 
        colorScheme={"blackAlpha"} 
      >
      <Thead backgroundColor={"gray.500"} >
        <Tr>
          <Th color={"white"}>Cliente em Potencial</Th>
          <Th color={"white"}>Dados Confirmados</Th>
          <Th color={"white"}>Reunião Agendada</Th>
        </Tr>
      </Thead>

      <Tbody color={"black"}>
        {leads && leads.map(({ name, email, status }) => (
          <DragDropContext key={email} onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={email} direction="horizontal">
              {(provided, { isDraggingOver }) => (
                <Tr className={email} {...provided.droppableProps} ref={provided.innerRef} bg={isDraggingOver ? "green.50" : ""}>
                  <Draggable draggableId={email+"0"} index={0}>
                    {(provided, { isDragging }) => (
                      <Td 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        h="52px"
                        bg={isDragging ? "#B3c7c777 !important": ""}
                        boxShadow={isDragging ? "0 5px #7777" : ""}
                        transition="background 0.8s, box-shadow 0.8s"
                      >
                        {status === "potential" && name}
                      </Td>)}
                  </Draggable>
                  <Draggable draggableId={email+"1"} index={1}>
                    {(provided, { isDragging }) => {
                      console.log(isDragging)
                       return (
                      <Td 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        h="52px"
                        bg={isDragging ? "#B3c7c777 !important": ""}
                        boxShadow={isDragging ? "0 5px #7777" : ""}
                        transition="background 0.8s, box-shadow 0.8s"
                      >
                        {status === "confirmed" && name}
                      </Td>)}}
                  </Draggable>
                  <Draggable draggableId={email+"2"} index={2}>
                    {(provided, { isDragging }) => (
                      <Td 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        h="52px"
                        bg={isDragging ? "#B3c7c777 !important": ""}
                        boxShadow={isDragging ? "0 5px #7777" : ""}
                        transition="background 0.8s, box-shadow 0.8s"
                      >
                        {status === "schelled" && name}
                      </Td>)}
                  </Draggable>
                  {/* {provided.placeholder}  */}
                </Tr>
              )}
            </Droppable>
          </DragDropContext>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
  )
}
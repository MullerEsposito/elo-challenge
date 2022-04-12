import { Checkbox, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ICheckBoxTable {
  id?: string;
  label: string;
  items: string[];
  checkedValues: string[];
  setCheckedValues: Dispatch<SetStateAction<string[]>>;
}


export function CheckBoxTable({ id, label, items, checkedValues, setCheckedValues }: ICheckBoxTable): JSX.Element {
  const initialStateCheckItems = new Array(items.length).fill(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialStateCheckItems);
  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {    
    if (checkedValues.length === 0) setCheckedItems(initialStateCheckItems);

  }, [checkedValues])

  return (
    <Flex flexDirection={"column"} id={id}>
      <Text mb={3}>{label}</Text>
        <TableContainer>
          <Table
            variant={"striped"}
            colorScheme={"blackAlpha"}
            size="sm"
          >
          <Thead backgroundColor={"gray.500"} >
            <Tr>
              <Th colSpan={2}>
                <Checkbox
                  isChecked={allChecked}
                  onChange={e => {
                    setCheckedItems(new Array(4).fill(!allChecked));
                    e.target.checked ? setCheckedValues([...items]) : setCheckedValues([])
                  }}
                  size='md'
                  colorScheme='green'
                />
              </Th>
            </Tr>
          </Thead>

          <Tbody color={"black"}>
            {items.map((value, idx) => (
              <Tr key={value}>
                <Td>
                  <Checkbox
                    size='md'
                    colorScheme='green'
                    isChecked={checkedItems[idx]}
                    onChange={e => {
                      setCheckedItems([...checkedItems.slice(0, idx++), e.target.checked, ...checkedItems.slice(idx++)]);
                      e.target.checked ? setCheckedValues([...checkedValues, value]) : setCheckedValues([...checkedValues.filter(v => v !== value)]);
                    }}
                  />
                </Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
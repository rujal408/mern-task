import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updateTask } from "../api/task";
import { Task } from "../types/tasks";
import TaskForm from "./task-form";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoading,
    onOpen: onLoadingOpen,
    onClose: onLoadingClose,
  } = useDisclosure();

  const {
    isOpen: isFetching,
    onOpen: onFetching,
    onClose: onFetchingClose,
  } = useDisclosure();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    onFetching();
    const data = await getTasks();
    setTasks(data);
    onFetchingClose;
  };

  const handleSave = async (task: Task) => {
    onLoadingOpen();
    if (selectedTask && selectedTask._id) {
      await updateTask(selectedTask._id, task);
    } else {
      await addTask(task);
    }
    await fetchTasks();
    onClose();
    onLoadingClose();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Box height="100vh" p={5}>
      <Heading mb={5}>Task Manager</Heading>
      <Button
        colorScheme="blue"
        onClick={() => {
          setSelectedTask(null);
          onOpen();
        }}
      >
        Add Task
      </Button>
      {isFetching && (
        <Table mt={5} variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Due Date</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task._id}>
                <Td>{task.title}</Td>
                <Td>{task.description}</Td>
                <Td>{new Date(task.due_date).toLocaleDateString()}</Td>
                <Td>{task.priority}</Td>
                <Td>
                  <Checkbox
                    defaultChecked={task.status}
                    onChange={(e) => {
                      if (task._id) {
                        updateTask(task._id, {
                          ...task,
                          status: e.target.checked,
                        });
                      }
                    }}
                  />
                </Td>

                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    mr={2}
                    onClick={() => {
                      setSelectedTask(task);
                      onOpen();
                    }}
                    aria-label="Edit Task"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(task._id!)}
                    aria-label="Delete Task"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <TaskForm
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        task={selectedTask}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TaskList;

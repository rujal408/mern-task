import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Task } from "../types/tasks";

const priorities = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null;
  isLoading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  isLoading,
}) => {
  const { register, handleSubmit, reset } = useForm<Task>();

  useEffect(() => {
    if (task && isOpen) {
      reset({ ...task, due_date: dayjs(task.due_date).format("YYYY-MM-DD") });
    } else {
      reset({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        status: false,
      });
    }
  }, [task, reset, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task ? "Edit Task" : "Add Task"}</ModalHeader>
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Title</FormLabel>
            <Input {...register("title", { required: true })} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Input {...register("description", { required: true })} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Due Date</FormLabel>
            <Input type="date" {...register("due_date", { required: true })} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Priority</FormLabel>

            <Select
              {...register("priority", { required: true })}
              placeholder="Select.."
            >
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
          <Button ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;

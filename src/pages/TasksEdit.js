import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../features/tasksSlice';
import { Form, Input, Button, Select, DatePicker, Spin } from 'antd'; // Ant Design components
import moment from 'moment';

const { Option } = Select;

const TasksEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, loading } = useSelector((state) => state.tasks);

  const [form] = Form.useForm();

  // Fetch task details when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = (values) => {
    const updatedTask = { ...values, id };
    dispatch(updateTask(updatedTask))
      .then(() => {
        navigate(`/tasks/${id}`); // Navigate to task details after update
      })
      .catch((err) => {
        console.error('Error updating task:', err);
      });
  };

  if (loading) {
    return <Spin size="large" />; // Show loading spinner while fetching task
  }

  return (
    <div style={{ margin: '20px' }}>
      {task ? (
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            title: task.title,
            assignedTo: task.assignedTo,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate ? moment(task.startDate, 'DDMMMYYYY') : null,
            endDate: task.endDate ? moment(task.endDate, 'DDMMMYYYY') : null,
          }}
        >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter task title' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Assigned To" name="assignedTo" rules={[{ required: true, message: 'Please enter assignee' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select task status' }]}>
            <Select>
              <Option value="Open">Open</Option>
              <Option value="In-Progress">In-Progress</Option>
              <Option value="Under-review">Under-review</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select task priority' }]}>
            <Select>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Start Date" name="startDate">
            <DatePicker format="DDMMMYYYY" />
          </Form.Item>

          <Form.Item label="End Date" name="endDate">
            <DatePicker format="DDMMMYYYY" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Task
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Task not found!</p>
      )}
    </div>
  );
};

export default TasksEdit;

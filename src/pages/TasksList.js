import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasksSlice';
import { Table, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom'; 
const TasksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { tasks, loading } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <a onClick={() => navigate(`/tasks/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      sorter: (a, b) => a.assignedTo.localeCompare(b.assignedTo),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      sorter: (a, b) => a.priority.localeCompare(b.priority),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/tasks/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => dispatch(deleteTask(record.id))}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={tasks.map(task => ({ ...task, key: task.id }))}
    />
  );
};

export default TasksList;

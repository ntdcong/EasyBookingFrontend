import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Badge, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const roles = ['User', 'Host', 'Admin'];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/api/v1/auth/pagination`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data?.data?.items) {
        setUsers(response.data.data.items);
        setTotalPages(response.data.data.totalPages);
      } else {
        setUsers([]);
        toast.error('Không có dữ liệu người dùng');
      }
    } catch (error) {
      setUsers([]);
      toast.error('Lỗi khi tải danh sách người dùng');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const getRoleNameFromId = (roleId) => {
    switch (roleId) {
      case '4b4526cc-7e65-47a0-8ee3-757695da7d59':
        return 'Admin';
      case 'c66cb512-4afd-4585-b772-ea0871d669cc':
        return 'Host';
      case 'cfd8fec3-df3a-4e77-9afc-b794883d65b4':
        return 'User';
      default:
        return 'User';
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser?.id || !selectedRole) {
      toast.error('Thông tin không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:8080/api/v1/auth/${selectedUser.id}/roles`,
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Cập nhật role thành công');
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      toast.error('Lỗi khi cập nhật role');
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(getRoleNameFromId(user.roleId));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedRole('');
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Quản Lý Người Dùng</h4>
          </div>
          <div className="card-body text-center p-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Quản Lý Người Dùng</h4>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="text-center p-4">
              <p>Không có dữ liệu người dùng</p>
            </div>
          ) : (
            <>
              <Table hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Xác thực</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={
                          getRoleNameFromId(user.roleId) === 'Admin' ? 'danger' :
                          getRoleNameFromId(user.roleId) === 'Host' ? 'warning' : 'info'
                        }>
                          {getRoleNameFromId(user.roleId)}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={user.verify === 'VERIFY' ? 'success' : 'warning'}>
                          {user.verify === 'VERIFY' ? 'Đã xác thực' : 'Chưa xác thực'}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={!user.isBlocked ? 'success' : 'danger'}>
                          {!user.isBlocked ? 'Hoạt động' : 'Đã khóa'}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleShowModal(user)}
                        >
                          Cập nhật Role
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="outline-primary"
                    className="mx-1"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    &laquo; Trước
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="mx-1"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Sau &raquo;
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}
                disabled
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateRole}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Đang xử lý...
              </>
            ) : (
              'Cập nhật'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
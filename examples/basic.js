import React from 'react';

const Basic = () => (
  <div>
    <h1>Basic Container Data</h1>
    <DataLayout
      data={fetchUsers}
      loadingIndicator={<LoadingIndicator />}
    >
      {({users}) => (
        <>
          <h1>Users</h1>
          {users.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))}
        </>
      )}
    </DataLayout>
  </div>
);

export default Basic;

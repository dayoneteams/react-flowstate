import React from 'react';
import { DataLayout } from 'react-flowstate';

const fetchCurrentUser = () =>
  new Promise<{ name: string; email: string }>(resolve =>
    setTimeout(
      () =>
        resolve({
          name: 'Root Admin User',
          email: 'rootadmin@gmail.com',
        }),
      2000
    )
  );

const fetchUserOrders = () =>
  new Promise<{ name: string; email: string }>(resolve =>
    setTimeout(
      () =>
        resolve([
          {
            orderId: '#12345',
            amount: '$1,000',
          },
          {
            orderId: '#45645',
            amount: '$4,000',
          },
          {
            orderId: '#45678',
            amount: '$2,000',
          },
        ]),
      2000
    )
  );

const fetchUserFavoriteItems = () =>
  new Promise<{ name: string; email: string }>(resolve =>
    setTimeout(
      () =>
        resolve([
          {
            itemId: '#12345',
            name: 'iPhone',
            price: '$1,000',
          },
          {
            itemId: '#45645',
            name: 'Samsung Galaxy',
            price: '$4,000',
          },
          {
            itemId: '#45678',
            name: 'Macbook',
            price: '$2,000',
          },
          {
            itemId: '#45658',
            name: 'Dell XPS',
            price: '$2,000',
          },
        ]),
      4000
    )
  );
export default () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl text-center">Layout nesting</h1>
    <h3 className="text-1xl text-center mb-5">Several levels of nesting</h3>
    <DataLayout
      dataSource={fetchCurrentUser}
      loadingIndicator={
        <div className="text-center">
          <progress className="progress progress-accent w-56" />
          <div>Loading data for root layout ...</div>
        </div>
      }
    >
      {({ data }) => (
        <div>
          <div className="card bg-green-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Current login user</h2>
              <div>Name: {data.name}</div>
              <div>Email: {data.email}</div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="card bg-yellow-100 shadow-xl">
                  <div className="card-body">
                    <DataLayout
                      dataSource={fetchUserOrders}
                      loadingIndicator={
                        <div className="text-center">
                          <progress className="progress progress-accent w-56" />
                          <div>Loading user orders ...</div>
                        </div>
                      }
                    >
                      {({ data, isLoading }) => (
                        <div>
                          <div className="flex justify-between">
                            <h2 className="card-title">User order history</h2>
                            <button
                              disabled={isLoading}
                              onClick={() => {}}
                              className="btn btn-sm btn-primary"
                            >
                              Reload
                            </button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="table w-full">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(order => (
                                  <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </DataLayout>
                  </div>
                </div>
                <div className="card bg-blue-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">User favorite items</h2>
                    <DataLayout
                      dataSource={fetchUserFavoriteItems}
                      loadingIndicator={
                        <div className="text-center">
                          <progress className="progress progress-accent w-56" />
                          <div>Loading user favorite items ...</div>
                        </div>
                      }
                    >
                      {({ data }) => (
                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <thead>
                              <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map(item => (
                                <tr key={item.itemId}>
                                  <td>{item.itemId}</td>
                                  <td>{item.name}</td>
                                  <td>{item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </DataLayout>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DataLayout>
  </div>
);

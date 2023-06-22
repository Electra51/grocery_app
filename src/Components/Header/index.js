import {
  HomeFilled,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API";
import img from "../../Assets/Img/img1.png";

function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          width: "96%",
          margin: "20px auto auto auto",
        }}
      >
        <Image width={100} src={img} />
        <Typography>
          Need help? Call Us :{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            + 033 4000 5000
          </span>
        </Typography>
      </div>
      <div
        style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          backgroundColor: "#FF5F1F",
        }}
      >
        <Menu
          style={{ backgroundColor: "#FF5F1F" }}
          className="appMenu"
          onClick={onMenuClick}
          mode="horizontal"
          items={[
            {
              label: "Home",
              key: "",
              icon: <HomeFilled />,
            },
            {
              label: "Men",
              key: "men",
              children: [
                {
                  label: "Men's Shirts",
                  key: "mens-shirts",
                },
                {
                  label: "Men's Shoes",
                  key: "mens-shoes",
                },
                {
                  label: "Men's Watches",
                  key: "mens-watches",
                },
              ],
            },
            {
              label: "Women",
              key: "women",
              children: [
                {
                  label: "Women's Dresses",
                  key: "womens-dresses",
                },
                {
                  label: "Women's Shoes",
                  key: "womens-shoes",
                },
                {
                  label: "Women's Watches",
                  key: "womens-watches",
                },
                {
                  label: "Women's Bags",
                  key: "womens-bags",
                },
                {
                  label: "Women's Jewellery",
                  key: "womens-jewellery",
                },
              ],
            },
            {
              label: "Fragrances",
              key: "fragrances",
            },
          ]}
        />
        {/* <Menu
          style={{ backgroundColor: "#FF5F1F" }}
          className="appMenu"
          onClick={onMenuClick}
          mode="horizontal"
          items={[
            {
              label: "Home",
              key: "",
              icon: <HomeFilled />,
            },
            {
              label: "Men",
              key: "men",
              children: [
                {
                  label: "Men's Shirts",
                  key: "mens-shirts",
                },
                {
                  label: "Men's Shoes",
                  key: "mens-shoes",
                },
                {
                  label: "Men's Watches",
                  key: "mens-watches",
                },
              ],
            },
            {
              label: "Women",
              key: "women",
              children: [
                {
                  label: "Women's Dresses",
                  key: "womens-dresses",
                },
                {
                  label: "Women's Shoes",
                  key: "womens-shoes",
                },
                {
                  label: "Women's Watches",
                  key: "womens-watches",
                },
                {
                  label: "Women's Bags",
                  key: "womens-bags",
                },
                {
                  label: "Women's Jewellery",
                  key: "womens-jewellery",
                },
              ],
            },
            {
              label: "Fragrances",
              key: "fragrances",
            },
          ]}
        /> */}
      </div>
    </div>
  );
}

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const onConfirmOrder = (values) => {
    console.log({ values });
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been placed successfully.");
  };

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItems.length}
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total: ${total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
            label="Email"
            name="your_name"
          >
            <Input placeholder="Enter your email.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="your_address"
          >
            <Input placeholder="Enter your full address.." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            {" "}
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
export default AppHeader;

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFetchOneRoleQuery } from '../../services/role.service';
import { useFetchOneUserQuery } from '../../services/user.service';
import { useForm } from 'react-hook-form';
import { useGetProductsQuery } from '../../services/product.service';
import { useFetchOneCartQuery } from '../../services/cart.service';

const TheHeader = () => {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const navigate = useNavigate()
    const storedStatus = JSON.parse(localStorage.getItem('user')!)
    const isLoggedIn1 = !!storedStatus;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRoles, setIRole] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const id = storedStatus?.user
    const { data: user } = useFetchOneUserQuery(id)
    const idrole = user?.role_id
    const { data: role } = useFetchOneRoleQuery(idrole)
    const { data: cartUser } = useFetchOneCartQuery(id);
    const cartlength = cartUser?.products.length
    useEffect(() => {
        if (role && role?.name === 'Admin') {
            setIRole(true);
        } else {
            setIRole(false);
        }
    }, [role]);

    useEffect(() => {
        if (isLoggedIn1 === true) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const { data: dataPro } = useGetProductsQuery();
    const { handleSubmit, register } = useForm<any>();
    const onHandleSubmit = ({ product }: any) => {
        const id_product = dataPro?.find((role) => role?.name === product)?._id
        if (id_product) {
            navigate("/product/" + id_product + "/detail")
        }
    };
    return (
        <div>
            <header className="main-header position-fixed w-100">
                <div className="" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                    <nav className="navbar navbar-expand-xl py-0">
                        <a className="d-inline-block d-lg-block d-xl-none d-xxl-none  nav-toggler text-decoration-none"
                            data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className="ti ti-menu-2"></i>
                        </a>
                        <div className="logo">
                            <a className="navbar-brand py-0 me-0" href="/"><img src="https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/logo.png?1699411180010" width="auto"
                                height="70px" alt="" /></a>
                        </div>
                        <a className="d-inline-block d-lg-block d-xl-none d-xxl-none nav-toggler text-decoration-none text-capitalize mr-5"
                            style={{ paddingTop: 8 }} href="cart.html">
                            <img src="/src/assets/images/cart.svg" alt="" className="cart-icon" />
                            <span className="count-cart">15</span>
                        </a>
                        <div className='d-flex justify-content-between w-100'>
                            <form onSubmit={handleSubmit(onHandleSubmit)} className="form form-search d-flex w-25">
                                <input type="text" placeholder="Tìm kiếm sản phẩm" list="name_product" {...register('product')} />
                                <datalist id="name_product" >
                                    {dataPro?.map((item) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </datalist >
                                <button type="submit" className="ti ti-search border-0" style={{ fontSize: "25px", backgroundColor: "white" }}></button>
                            </form>

                            <div id="navbarSupportedContent">
                                <div className="d-flex">
                                    <Link to={"/cart"} className="cart">
                                        <img src="https://www.pngmart.com/files/7/Cart-PNG-Photos.png" width="50px" alt="" className="cart-icon" />
                                        <span className="count-cart">{cartlength}</span>
                                    </Link>
                                    <div className="login d-block align-items-center mr-8" id="sing">
                                        {isLoggedIn ? (
                                            <div className="dropdown">
                                                {/* <button className="btn btn1"> */}
                                                <img src={user?.image} alt="Lỗi ảnh" width={40} height={40} style={{ borderRadius: "50%" }} />
                                                {/* </button> */}
                                                <div className="dropdown-content" style={{ width: "100px", borderRadius: "10px" }}>
                                                    <Link to="/profile" className='link1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style={{ margin: "5px" }}>
                                                            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                    {isRoles ? (
                                                        <Link to="/admin" className='link1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" style={{ margin: "5px" }}>
                                                                <path d="M480 0c-17.7 0-32 14.3-32 32V192 512h64V192H624c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H512c0-17.7-14.3-32-32-32zM416 159L276.8 39.7c-12-10.3-29.7-10.3-41.7 0l-224 192C1 240.4-2.7 254.5 2 267.1S18.6 288 32 288H64V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96c0 17.7 14.3 32 32 32h64.7l.2 0h-1V159z" />
                                                            </svg>
                                                            Admin
                                                        </Link>

                                                    ) : (
                                                        <span></span>
                                                    )}
                                                    <button onClick={handleLogout} className='link1-btn'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ margin: "5px" }}>
                                                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                                        </svg>
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to="/signin" className='nav-link '><button className="btn btn-primary">Đăng nhập</button></Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </nav>
                </div>

                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <div className="logo">
                            <a className="navbar-brand py-0 me-0" href="#"><img width="100%" height="auto"
                                src="" alt="" /></a>
                        </div>
                        <button type="button" className="btn-close text-reset  ms-auto" data-bs-dismiss="offcanvas"
                            aria-label="Close"><i className="ti ti-x"></i></button>
                    </div>
                    <div className="offcanvas-body pt-0">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Trang Chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Giới Thiệu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sản Phẩm</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Tin Tức</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Khuyến Mại</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên Hệ</a>
                            </li>
                        </ul>
                        <div className="login d-block align-items-center" id='sing'>
                            <a className="btn btn-primary text-capitalize w-100" href="#" >Đăng Nhập</a>
                        </div>
                    </div>
                </div>
            </header>
            <style dangerouslySetInnerHTML={{ __html: "\n/* Style The Dropdown Button */\n.dropbtn {\n  background-color: #4CAF50;\n  color: white;\n  padding: 16px;\n  font-size: 16px;\n  border: none;\n  cursor: pointer;\n}\n\n/* The container <div> - needed to position the dropdown content */\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n/* Dropdown Content (Hidden by Default) */\n.dropdown-content {\n  display: none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n  z-index: 1;\n}\n\n/* Links inside the dropdown */\n.dropdown-content a {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n\n/* Change color of dropdown links on hover */\n.dropdown-content a:hover {background-color: #f1f1f1}\n\n/* Show the dropdown menu on hover */\n.dropdown:hover .dropdown-content {\n  display: block;\n}\n\n/* Change the background color of the dropdown button when the dropdown content is shown */\n.dropdown:hover .dropbtn {\n  background-color: #3e8e41;\n}\n" }} />
        </div>
    )
}

export default TheHeader

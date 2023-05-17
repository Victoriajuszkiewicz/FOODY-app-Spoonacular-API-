import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./NavBar.css";
import { GiCookingPot } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import logo from "../img/foody.png";

const NavBar = (props) => {
	const handleLogoClick = () => {
		props.setIngredients([]);
	};

	return (
		<nav
			className="navbar navbar-expand-lg navbar-light justify-content-between"
			style={{ padding: "0px 10px" }}
		>
			<div className="spaceforlogo">
				<NavLink to="/">
					<img
						className="logo"
						src={logo}
						alt="this is a logo of very cool app created by 4 very talented people"
						style={{ width: 60, height: 60 }}
						onClick={() => handleLogoClick()}
					/>
				</NavLink>
			</div>
			<div className="menubutton  dropleft">
				{props.user ? (
					<div className="btn-group dropleft dropstart">
						<button
							className="btn btn-light btn-sm dropdown-toggle dropleft"
							id="stylesforbuttonnav"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							aria-haspopup="true"
						>
							{/* this is the icon I have imported directly from react-icon library */}
							<GiCookingPot />
						</button>
						<ul className="dropdown-menu dropdown-menu-dark dropleft">
							<li>
								<NavLink
									to="/login"
									onClick={props.logoutCb}
									className="dropdown-item"
								>
									Sign out
								</NavLink>
							</li>
							<li>
								<NavLink to="/favorites" className="dropdown-item">
									Favorites
								</NavLink>
							</li>
							<li>
								<NavLink to="/aboutUs" className="dropdown-item">
									About us
								</NavLink>
							</li>
						</ul>
					</div>
				) : (
					<div className="btn-group dropleft dropstart">
						<button
							className="btn btn-secondary btn-sm dropdown-toggle  dropleft"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							id="stylesforbuttonnav"
						>
							{/* this is the icon I have imported directly from react-icon library */}
							<GiCookingPot />
						</button>
						<ul className="dropdown-menu dropdown-menu-dark  dropleft">
							<li>
								<NavLink to="/login" className="dropdown-item">
									Sign in
								</NavLink>
							</li>

							<li>
								<NavLink to="/aboutUs" className="dropdown-item">
									About us
								</NavLink>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;

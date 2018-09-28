import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container, Nav} from "reactstrap";
import {
	AppBreadcrumb,
	AppHeader,
	AppNavbarBrand,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppSidebarNav,
	AppSidebarToggler,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav.js";
// routes config
import routes from "../../routes.js";

import Logo from "../../assets/img/Full-Loge.png";
import FullLogo from "../../assets/img/Full-Loge.png";

import {withApollo} from "react-apollo";


class AppContainer extends Component {

	render() {
		return (
			<div className="app">
				<AppHeader fixed>
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
					<AppNavbarBrand
						full={{ src: FullLogo, width: 89, height: 25, alt: "XohoTech Logo" }}
						minimized={{ src: Logo, width: 30, height: 30, alt: "XohoTech Logo" }}
					/>
					<AppSidebarToggler className="d-md-down-none" display="lg" />
					<Nav className="ml-auto" navbar>
					</Nav>
				</AppHeader>
				<div className="app-body">
					<AppSidebar fixed display="lg">
						<AppSidebarHeader />
						<AppSidebarForm />
						<AppSidebarNav navConfig={navigation} {...this.props} />
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar>
					<main className="main">
						<AppBreadcrumb appRoutes={routes}>
						</AppBreadcrumb>
						<Container fluid>
							<Switch>
								{routes.map((route, idx) => {
									return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
										<route.component {...props} />
									)} />)
										: (null);
								},
								)}
								<Redirect from="/" to="/dashboard" />
							</Switch>
						</Container>
					</main>
				</div>
			</div>);
	}

}

export default withApollo(AppContainer);
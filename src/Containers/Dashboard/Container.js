import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu} from 'reactstrap';
import {
    AppAside,
    AppAsideToggler,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppHeaderDropdown,
    AppNavbarBrand,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
    AppSidebarToggler,
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav.js';
// routes config
import routes from '../../routes.js';

import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'


class AppContainer extends Component {

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <AppSidebarToggler className="d-lg-none" display="md" mobile />
                    <AppNavbarBrand
                        full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
                        minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
                    />
                    <AppSidebarToggler className="d-md-down-none" display="lg" />
                    <Nav className="ml-auto" navbar>
                    </Nav>
                    <AppAsideToggler className="d-md-down-none" />
                    <AppAsideToggler className="d-lg-none" mobile />
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
                    <AppAside fixed hidden display="lg">
                        Aside
                    </AppAside>
                </div>
            </div>)
    }

}

export default AppContainer;
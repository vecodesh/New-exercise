import React, { Component, createRef } from 'react';
import './Home.css';
import About from './About/About'; 
import Gallery from './Gallery/Gallery';
import Gallery1 from './Gallery/Gallery1';
import { FaSearch, FaHome, FaUtensils, FaInfoCircle, FaConciergeBell, FaUserCircle } from 'react-icons/fa';
import Room from './Room';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRestaurantDropdown: false,
      showBookingsDropdown: false,
      showAboutDropdown: false,
      showServicesDropdown: false,
      ser: false // This controls showing Room
    };
    this.aboutUsRef = createRef();
    this.mainPageRef = createRef();
    this.restaurant1Ref = createRef();
    this.restaurant2Ref = createRef();
  }

  // Toggle the visibility of dropdown menus
  toggleDropdown = (dropdown) => {
    this.setState({
      showRestaurantDropdown: dropdown === 'restaurant',
      showBookingsDropdown: dropdown === 'bookings',
      showAboutDropdown: dropdown === 'about',
      showServicesDropdown: dropdown === 'services',
    });
  };

  // Scroll to different sections
  scrollToAboutUs = () => {
    if (this.aboutUsRef.current) {
      this.aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  scrollToRestaurant1 = () => {
    if (this.restaurant1Ref.current) {
      this.restaurant1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  scrollToRestaurant2 = () => {
    if (this.restaurant2Ref.current) {
      this.restaurant2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Control scroll behavior
  enableScroll = () => {
    document.body.style.overflow = 'auto'; 
  };

  disableScroll = () => {
    document.body.style.overflow = 'hidden'; 
  };

  // Control the search toggle
  serc = () => {
    this.setState({ ser: true });
  };

  isser = () => {
    this.setState({ ser: false }); // Reset ser state to go back
  };

  render() {
    return (
      <div>
        {this.state.ser ? ( 
          // Show Room component when ser is true
          <Room isser={this.isser} />
        ) : (
          <div>
            <div className="banner" ref={this.mainPageRef}>
              <video autoPlay loop muted playsInline>
                <source src={require('./Hotel room.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="navbar">
                <ul>
                  <li>
                    <button className="nav-link" onClick={this.disableScroll}>
                      <FaHome /> Home
                    </button>
                  </li>
                  <li
                    onMouseEnter={() => this.toggleDropdown('restaurant')}
                    onMouseLeave={() => this.toggleDropdown('')}
                  >
                    <button className="nav-link" onClick={this.enableScroll}>
                      <FaUtensils /> Restaurant
                    </button>
                    {this.state.showRestaurantDropdown && (
                      <ul className="dropdown-content">
                        <li onClick={this.scrollToRestaurant1}>
                          <a href="#restaurant1">Restaurant 1</a>
                        </li>
                        <li onClick={this.scrollToRestaurant2}>
                          <a href="#restaurant2">Restaurant 2</a>
                        </li>
                        <li><a href="#restaurant3">Restaurant 3</a></li>
                      </ul>
                    )}
                  </li>
                  <li
                    onMouseEnter={() => this.toggleDropdown('bookings')}
                    onMouseLeave={() => this.toggleDropdown('')}
                  >
                    <button className="nav-link">
                      <FaConciergeBell /> Bookings
                    </button>
                    {this.state.showBookingsDropdown && (
                      <ul className="dropdown-content">
                        <li onClick={this.scrollToRestaurant1}><a href="#booking1">Booking 1</a></li>
                        <li onClick={this.scrollToRestaurant1}><a href="#booking2">Booking 2</a></li>
                        <li><a href="#booking3">Booking 3</a></li>
                      </ul>
                    )}
                  </li>
                  <li
                    onMouseEnter={() => this.toggleDropdown('about')}
                    onMouseLeave={() => this.toggleDropdown('')}
                  >
                    <button className="nav-link" onClick={this.scrollToAboutUs}>
                      <FaInfoCircle /> About
                    </button>
                    {this.state.showAboutDropdown && (
                      <ul className="dropdown-content">
                        <li><a href="#about1">About Us</a></li>
                        <li><a href="#about2">Our Story</a></li>
                        <li><a href="#about3">Team</a></li>
                      </ul>
                    )}
                  </li>
                  <li
                    onMouseEnter={() => this.toggleDropdown('services')}
                    onMouseLeave={() => this.toggleDropdown('')}
                  >
                    <button className="nav-link">
                      <FaConciergeBell /> Services
                    </button>
                    {this.state.showServicesDropdown && (
                      <ul className="dropdown-content">
                        <li><a href="#service1">Room Service</a></li>
                        <li><a href="#service2">Spa</a></li>
                        <li><a href="#service3">Gym</a></li>
                      </ul>
                    )}
                  </li>
                </ul>
                <div className="search-bar">
                  <input type="text" placeholder="Search..." />
                  <button type="button" className="search-button" 
                  onClick={this.serc}>
                    <FaSearch />
                  </button>
                </div>
              </div>
              <div className="welcome">
                <h1>Welcome to Book My Stay</h1>
              </div>
            <h1 className="User">
              <FaUserCircle />{this.props.username}
            </h1>
            </div>
            <div>
              <About ref={this.aboutUsRef} />
            </div>
            <div ref={this.restaurant1Ref}>
              <Gallery />
            </div>
            <div ref={this.restaurant2Ref}>
              <Gallery1 />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;

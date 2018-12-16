import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../actions';

const initialState = {
  username: '',
  bio: '',
  profile_picture_upload: null,
  gym_picture_upload: null,
  error: null
};

class Profile extends React.Component {

  state = initialState

  handleFileUpload = (event) => {
    const image = event.currentTarget.files[0];
    if (event.currentTarget.name === 'gym_image') {
      this.setState({ gym_picture_upload: image });
    } else if (event.currentTarget.name === 'profile_image') {
      this.setState({ profile_picture_upload: image });
    }
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = this.props;
    const {
      username,
      bio,
      profile_picture_upload,
      gym_picture_upload,
    } = this.state;

    const formData = new FormData();
    formData.set("username", username);
    if (profile_picture_upload)
      formData.append("profile_image_upload", profile_picture_upload);
    if (gym_picture_upload)
      formData.append("gym_image_upload", gym_picture_upload);
    formData.set("bio", bio);

    try {
      await this.props.updateUser(user._id, formData);
      this.setState(initialState);
    } catch (err) {
      this.setState({
        username: user.username,
        bio: user.bio,
        error: err.message
      });
    }
  }

  render() {
    const { user } = this.props;

    return <>
      {this.state.error &&
       <p className="notification is-danger">{this.state.error}</p>}

      <div className = "container">
        <div className="columns">
          <div className="column">
            <p>username: {user.username}</p>
            <p>bio: {user.bio}</p>
            <img src={user.profile_image} alt="profile"></img>
          </div>

          <div className="column">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <h1>Update profile</h1>

              <div className="field">
                <label className="label">username</label>
                <div className="control">
                  <input
                    type="text"
                    name="username"
                    className="input"
                    onChange={this.handleChange}
                    placeholder={user.username}
                    value={this.state.username} />
                </div>
              </div>

              <div className="field">
                <label className="label">bio</label>
                <div className="control">
                  <textarea
                    type="text"
                    name="bio"
                    className="textarea"
                    onChange={this.handleChange}
                    placeholder={user.bio}
                    value={this.state.bio} />
                </div>
              </div>

              <div className="field">
                <label className="label">Profile Picture</label>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="profile_image"
                      onChange={this.handleFileUpload} />
                    <span className="file-cta">
                      <span aria-label="Camera" role="img" className="file-icon">📷</span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">
                      {this.state.profile_picture_upload
                       ? this.state.profile_picture_upload.name
                       : 'no image selected'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="field">
                <label className="label">Gym Picture</label>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="gym_image"
                      onChange={this.handleFileUpload} />
                    <span className="file-cta">
                      <span aria-label="Camera" roll="img" className="file-icon">📷</span>
                      <span className="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span className="file-name">
                      {this.state.gym_picture_upload
                        ? this.state.gym_picture_upload.name
                        : 'no image selected'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button" type="submit" value="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="columns is-multiline">
                        
          {this.props.user.images &&
           this.props.user.images.map(url => 
                                      <div className="column is-one-third">
                                        <img src={`${url}`}></img>
                                      </div>
                                      ) 
          }

        </div>
      </div>
    </>;
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { updateUser }
)(Profile);

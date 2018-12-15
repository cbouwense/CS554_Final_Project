import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../actions';

class Profile extends React.Component {
  initialState = {
    username: '',
    bio: '',
    profile_picture_upload: null,
    upload_name: '',
    error: null
  };

  state = {
    username: '',
    bio: '',
    profile_picture_upload: null,
    upload_name: '',
    error: null
  };

  handleFileUpload = (event) => {
    let image = event.currentTarget.files[0];
    this.setState({ profile_picture_upload: image, upload_name: image.name })
  }

  handleChange = (event) => {
    event.preventDefault();

    let { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = this.props;
    let { username, bio, profile_picture_upload, upload_name } = this.state;

    let form_data = new FormData();
    form_data.set("username", username);
    form_data.append("profile_image_upload", profile_picture_upload, upload_name);
    form_data.set("bio", bio);

    try {
      await this.props.updateUser(user._id, form_data);
    } catch (err) {
      this.setState({
        username: user.username,
        bio: user.bio,
        error: err.message
      })
    }
    state = initialState;
  }

  render() {
    const { user } = this.props;
    let update = this.state;

    return <>
      {
        this.state.error && (
          <p className="notification is-danger">{this.state.error}</p>
        )
      }
      < div className = "container" >

        <div className="columns">
          <div className="column">
            <p>username: {user.username}</p>
            <p>bio: {user.bio}</p>
            <img src={user.profile_image}></img>
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
                    value={update.username} />
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
                    value={update.bio} />
                </div>
              </div>

              <div className="field">
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="profile_image"
                      onChange={this.handleFileUpload} />
                    <span className="file-cta">
                      <span aria-label="Camera" roll="img" className="file-icon">📷</span>
                      <span className="file-label">
                        Choose a file…
                          </span>
                    </span>
                    <span className="file-name">
                      {this.state.profile_picture_upload
                        ? this.state.upload_name
                        : <>
                        'no image uploaded'
                            </>}
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

          </div >
        </>;
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { updateUser }
)(Profile);

import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../actions';

class Profile extends React.Component {

  state = {
    username: this.props.user.username,
    profile_image: this.props.user.profile_image,
    bio: this.props.user.bio,
    image_upload: null,
    image_name: '',    
    error: null
  };

  handleFileUpload = (event) => {
    const image = event.currentTarget.files[0];
    this.setState({ image_upload: image, image_name: image.name })
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = this.props;

    if (this.state.image_upload)
      this.setState({ profile_image: this.state.image_upload });
    try {
      await this.props.updateUser(user._id, {
        username: this.state.username,
        profile_image: this.state.profile_image,
        bio: this.state.bio
      });
    } catch (err) {
      this.setState({
        username: user.username,
        profile_image: user.profile_image,
        bio: user.bio,
        error: err.message
      })
    }
  }

  render() {
    const { user } = this.props;
    const update = this.state;

    return (
      <div className="container">

        <div className="columns">
          <div className="column">
            <p>username: {user.username}</p>
            <p>bio: {user.bio}</p>
          </div>

          <div className="column">
            <form action="">
              <h1>Update profile</h1>

              <div className="field">
                <label htmlFor="" className="label">username</label>
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
                <label htmlFor="" className="label">bio</label>
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
                <div class="file has-name">
                  <label class="file-label">
                    <input 
                      className="file-input" 
                      type="file" 
                      name="profile_image"
                      onChange={this.handleFileUpload} />
                      <span class="file-cta">
                        <span class="file-icon">
                          📷
                        </span>
                        <span class="file-label">
                          Choose a file…
                        </span>
                      </span>
                      <span className="file-name">
                        {this.state.image_upload
                        ? this.state.image_name
                        : <>
                            no image uploaded
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

        </div>
        );
  }
}

export default connect(
  state => ({user: state.auth.user }),
  {updateUser}
        )(Profile);

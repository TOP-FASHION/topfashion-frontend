import * as React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../../containers/shared/PageHeader';
import './ContactUsPage.scss';

const ContactUsPage = () => {
  const breadcrumb = [
    { title: 'Home', url: '/' },
    { title: 'Contact Us', url: '' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us Alt</title>
      </Helmet>

      <div className="block-map">
        <div className="block-map__body">
          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            frameBorder="0"
            scrolling="no"
            // @ts-ignore
            marginHeight="0"
            // @ts-ignore
            marginWidth="0"
          />
        </div>
      </div>

      <PageHeader header="Contact Us" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="card mb-0 contact-us">
            <div className="card-body">
              <div className="contact-us__container">
                <div className="row">
                  <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                    <h4 className="contact-us__header card-title">
                      Our Address
                    </h4>

                    <div className="contact-us__address">
                      <p>
                        715 Fake Ave, Apt. 34, New York, NY 10021 USA
                        <br />
                        Email: stroyka@example.com
                        <br />
                        Phone Number: +1 754 000-00-00
                      </p>

                      <p>
                        <strong>Opening Hours</strong>
                        <br />
                        Monday to Friday: 8am-8pm
                        <br />
                        Saturday: 8am-6pm
                        <br />
                        Sunday: 10am-4pm
                      </p>

                      <p>
                        <strong>Comment</strong>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur suscipit suscipit mi, non tempor nulla finibus
                        eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <h4 className="contact-us__header card-title">
                      Leave us a Message
                    </h4>

                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="form-name">Your Name</label>
                          <input
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="form-email">Email</label>
                          <input
                            type="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-subject">Subject</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-message">Message</label>
                        <textarea
                          id="form-message"
                          className="form-control"
                          rows={4}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;

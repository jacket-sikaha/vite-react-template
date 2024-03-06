import { Suspense, useState } from "react";
// import "./assets/css/main.module.css"; // 只跟引入方式有关，与文件名无关，现在还是普通导入不是css module

const themes = ["light", "dark", "cupcake", "retro", "valentine"];
function Theme() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <div className="flex">
        {themes.map((item) => {
          return (
            <button key={item} onClick={() => setTheme(item)}>
              {item}
            </button>
          );
        })}
      </div>
      <body data-theme={theme} className="is-preload bg-th-bg text-th-text">
        <header id="header">
          <div className="inner">
            <a href="#" className="image avatar">
              <img src="images/avatar.jpg" alt="" />
            </a>
            <h1>
              <strong>I am Strata</strong>, a super simple
              <br />
              responsive site template freebie
              <br />
              crafted by <a href="http://html5up.net">HTML5 UP</a>.
            </h1>
          </div>
        </header>

        <div id="main">
          <section id="one">
            <header className="major">
              <h2>
                Ipsum lorem dolor aliquam ante commodo
                <br />
                magna sed accumsan arcu neque.
              </h2>
            </header>
            <p>
              Accumsan orci faucibus id eu lorem semper. Eu ac iaculis ac nunc
              nisi lorem vulputate lorem neque cubilia ac in adipiscing in curae
              lobortis tortor primis integer massa adipiscing id nisi accumsan
              pellentesque commodo blandit enim arcu non at amet id arcu magna.
              Accumsan orci faucibus id eu lorem semper nunc nisi lorem
              vulputate lorem neque cubilia.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </section>

          <section id="two">
            <h2>Recent Work</h2>
            <div className="row">
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/01.jpg" className="image fit thumb">
                  <img src="images/thumbs/01.jpg" alt="" />
                </a>
                <h3>Magna sed consequat tempus</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/02.jpg" className="image fit thumb">
                  <img src="images/thumbs/02.jpg" alt="" />
                </a>
                <h3>Ultricies lacinia interdum</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/03.jpg" className="image fit thumb">
                  <img src="images/thumbs/03.jpg" alt="" />
                </a>
                <h3>Tortor metus commodo</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/04.jpg" className="image fit thumb">
                  <img src="images/thumbs/04.jpg" alt="" />
                </a>
                <h3>Quam neque phasellus</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/05.jpg" className="image fit thumb">
                  <img src="images/thumbs/05.jpg" alt="" />
                </a>
                <h3>Nunc enim commodo aliquet</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
              <article className="col-6 col-12-xsmall work-item">
                <a href="images/fulls/06.jpg" className="image fit thumb">
                  <img src="images/thumbs/06.jpg" alt="" />
                </a>
                <h3>Risus ornare lacinia</h3>
                <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
              </article>
            </div>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Full Portfolio
                </a>
              </li>
            </ul>
          </section>

          <section id="three">
            <h2>Get In Touch</h2>
            <p>
              Accumsan pellentesque commodo blandit enim arcu non at amet id
              arcu magna. Accumsan orci faucibus id eu lorem semper nunc nisi
              lorem vulputate lorem neque lorem ipsum dolor.
            </p>
            <div className="row">
              <div className="col-8 col-12-small">
                <form method="post" action="#">
                  <div className="row gtr-uniform gtr-50">
                    <div className="col-6 col-12-xsmall">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-6 col-12-xsmall">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                </form>
                <ul className="actions">
                  <li>
                    <input type="submit" value="Send Message" />
                  </li>
                </ul>
              </div>
              <div className="col-4 col-12-small">
                <ul className="labeled-icons">
                  <li>
                    <h3 className="icon solid fa-home">
                      <span className="label">Address</span>
                    </h3>
                    1234 Somewhere Rd.
                    <br />
                    Nashville, TN 00000
                    <br />
                    United States
                  </li>
                  <li>
                    <h3 className="icon solid fa-mobile-alt">
                      <span className="label">Phone</span>
                    </h3>
                    000-000-0000
                  </li>
                  <li>
                    <h3 className="icon solid fa-envelope">
                      <span className="label">Email</span>
                    </h3>
                    <a href="#">hello@untitled.tld</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="four">
            <h2>Elements</h2>

            <section>
              <h4>Text</h4>
              <p>
                This is <b>bold</b> and this is <strong>strong</strong>. This is{" "}
                <i>italic</i> and this is <em>emphasized</em>. This is{" "}
                <sup>superscript</sup> text and this is <sub>subscript</sub>{" "}
                text. This is <u>underlined</u> and this is code:{" "}
                <code>{`for (;;) { ... }`}</code>. Finally,{" "}
                <a href="#">this is a link</a>.
              </p>
              <hr />
              <header>
                <h4>Heading with a Subtitle</h4>
                <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
              </header>
              <p>
                Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida
                odio porttitor sem non mi integer non faucibus ornare mi ut ante
                amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem
                accumsan varius montes viverra nibh in adipiscing blandit tempus
                accumsan.
              </p>
              <header>
                <h5>Heading with a Subtitle</h5>
                <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
              </header>
              <p>
                Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida
                odio porttitor sem non mi integer non faucibus ornare mi ut ante
                amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem
                accumsan varius montes viverra nibh in adipiscing blandit tempus
                accumsan.
              </p>
              <hr />
              <h2>Heading Level 2</h2>
              <h3>Heading Level 3</h3>
              <h4>Heading Level 4</h4>
              <h5>Heading Level 5</h5>
              <h6>Heading Level 6</h6>
              <hr />
              <h5>Blockquote</h5>
              <blockquote>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt
                felis sagittis eget tempus euismod. Vestibulum ante ipsum primis
                in faucibus vestibulum. Blandit adipiscing eu felis iaculis
                volutpat ac adipiscing accumsan faucibus. Vestibulum ante ipsum
                primis in faucibus lorem ipsum dolor sit amet nullam adipiscing
                eu felis.
              </blockquote>
              <h5>Preformatted</h5>
              <pre>
                <code>
                  {
                    "i = 0;while (!deck.isInOrder()) {print 'Iteration ' + i;deck.shuffle();i+;}print 'It took ' + i + ' iterations to sort the deck.';"
                  }
                </code>
              </pre>
            </section>

            <section>
              <h4>Lists</h4>
              <div className="row">
                <div className="col-6 col-12-xsmall">
                  <h5>Unordered</h5>
                  <ul>
                    <li>Dolor pulvinar etiam magna etiam.</li>
                    <li>Sagittis adipiscing lorem eleifend.</li>
                    <li>Felis enim feugiat dolore viverra.</li>
                  </ul>
                  <h5>Alternate</h5>
                  <ul className="alt">
                    <li>Dolor pulvinar etiam magna etiam.</li>
                    <li>Sagittis adipiscing lorem eleifend.</li>
                    <li>Felis enim feugiat dolore viverra.</li>
                  </ul>
                </div>
                <div className="col-6 col-12-xsmall">
                  <h5>Ordered</h5>
                  <ol>
                    <li>Dolor pulvinar etiam magna etiam.</li>
                    <li>Etiam vel felis at lorem sed viverra.</li>
                    <li>Felis enim feugiat dolore viverra.</li>
                    <li>Dolor pulvinar etiam magna etiam.</li>
                    <li>Etiam vel felis at lorem sed viverra.</li>
                    <li>Felis enim feugiat dolore viverra.</li>
                  </ol>
                  <h5>Icons</h5>
                  <ul className="icons">
                    <li>
                      <a href="#" className="icon brands fa-twitter">
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-facebook-f">
                        <span className="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-instagram">
                        <span className="label">Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-github">
                        <span className="label">Github</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-dribbble">
                        <span className="label">Dribbble</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-tumblr">
                        <span className="label">Tumblr</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h5>Actions</h5>
              <ul className="actions">
                <li>
                  <a href="#" className="button primary">
                    Default
                  </a>
                </li>
                <li>
                  <a href="#" className="button">
                    Default
                  </a>
                </li>
              </ul>
              <ul className="actions small">
                <li>
                  <a href="#" className="button primary small">
                    Small
                  </a>
                </li>
                <li>
                  <a href="#" className="button small">
                    Small
                  </a>
                </li>
              </ul>
              <div className="row">
                <div className="col-6 col-12-small">
                  <ul className="actions stacked">
                    <li>
                      <a href="#" className="button primary">
                        Default
                      </a>
                    </li>
                    <li>
                      <a href="#" className="button">
                        Default
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-12-small">
                  <ul className="actions stacked">
                    <li>
                      <a href="#" className="button primary small">
                        Small
                      </a>
                    </li>
                    <li>
                      <a href="#" className="button small">
                        Small
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-12-small">
                  <ul className="actions stacked">
                    <li>
                      <a href="#" className="button primary fit">
                        Default
                      </a>
                    </li>
                    <li>
                      <a href="#" className="button fit">
                        Default
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-12-small">
                  <ul className="actions stacked">
                    <li>
                      <a href="#" className="button primary small fit">
                        Small
                      </a>
                    </li>
                    <li>
                      <a href="#" className="button small fit">
                        Small
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h4>Table</h4>
              <h5>Default</h5>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Item One</td>
                      <td>Ante turpis integer aliquet porttitor.</td>
                      <td>29.99</td>
                    </tr>
                    <tr>
                      <td>Item Two</td>
                      <td>Vis ac commodo adipiscing arcu aliquet.</td>
                      <td>19.99</td>
                    </tr>
                    <tr>
                      <td>Item Three</td>
                      <td> Morbi faucibus arcu accumsan lorem.</td>
                      <td>29.99</td>
                    </tr>
                    <tr>
                      <td>Item Four</td>
                      <td>Vitae integer tempus condimentum.</td>
                      <td>19.99</td>
                    </tr>
                    <tr>
                      <td>Item Five</td>
                      <td>Ante turpis integer aliquet porttitor.</td>
                      <td>29.99</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}></td>
                      <td>100.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <h5>Alternate</h5>
              <div className="table-wrapper">
                <table className="alt">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Item One</td>
                      <td>Ante turpis integer aliquet porttitor.</td>
                      <td>29.99</td>
                    </tr>
                    <tr>
                      <td>Item Two</td>
                      <td>Vis ac commodo adipiscing arcu aliquet.</td>
                      <td>19.99</td>
                    </tr>
                    <tr>
                      <td>Item Three</td>
                      <td> Morbi faucibus arcu accumsan lorem.</td>
                      <td>29.99</td>
                    </tr>
                    <tr>
                      <td>Item Four</td>
                      <td>Vitae integer tempus condimentum.</td>
                      <td>19.99</td>
                    </tr>
                    <tr>
                      <td>Item Five</td>
                      <td>Ante turpis integer aliquet porttitor.</td>
                      <td>29.99</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}></td>
                      <td>100.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            <section>
              <h4>Buttons</h4>
              <ul className="actions">
                <li>
                  <a href="#" className="button primary">
                    Primary
                  </a>
                </li>
                <li>
                  <a href="#" className="button">
                    Default
                  </a>
                </li>
              </ul>
              <ul className="actions">
                <li>
                  <a href="#" className="button large">
                    Large
                  </a>
                </li>
                <li>
                  <a href="#" className="button">
                    Default
                  </a>
                </li>
                <li>
                  <a href="#" className="button small">
                    Small
                  </a>
                </li>
              </ul>
              <ul className="actions fit">
                <li>
                  <a href="#" className="button primary fit">
                    Fit
                  </a>
                </li>
                <li>
                  <a href="#" className="button fit">
                    Fit
                  </a>
                </li>
              </ul>
              <ul className="actions fit small">
                <li>
                  <a href="#" className="button primary fit small">
                    Fit + Small
                  </a>
                </li>
                <li>
                  <a href="#" className="button fit small">
                    Fit + Small
                  </a>
                </li>
              </ul>
              <ul className="actions">
                <li>
                  <a href="#" className="button primary icon solid fa-download">
                    Icon
                  </a>
                </li>
                <li>
                  <a href="#" className="button icon solid fa-download">
                    Icon
                  </a>
                </li>
              </ul>
              <ul className="actions">
                <li>
                  <span className="button primary disabled">Primary</span>
                </li>
                <li>
                  <span className="button disabled">Default</span>
                </li>
              </ul>
            </section>

            <section>
              <h4>Form</h4>
              <form method="post" action="#">
                <div className="row gtr-uniform gtr-50">
                  <div className="col-6 col-12-xsmall">
                    <input
                      type="text"
                      name="demo-name"
                      id="demo-name"
                      value=""
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-6 col-12-xsmall">
                    <input
                      type="email"
                      name="demo-email"
                      id="demo-email"
                      value=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-12">
                    <select name="demo-category" id="demo-category">
                      <option value="">- Category -</option>
                      <option value="1">Manufacturing</option>
                      <option value="1">Shipping</option>
                      <option value="1">Administration</option>
                      <option value="1">Human Resources</option>
                    </select>
                  </div>
                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-low"
                      name="demo-priority"
                      checked
                    />
                    <label htmlFor="demo-priority-low">Low Priority</label>
                  </div>
                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-normal"
                      name="demo-priority"
                    />
                    <label htmlFor="demo-priority-normal">
                      Normal Priority
                    </label>
                  </div>
                  <div className="col-4 col-12-small">
                    <input
                      type="radio"
                      id="demo-priority-high"
                      name="demo-priority"
                    />
                    <label htmlFor="demo-priority-high">High Priority</label>
                  </div>
                  <div className="col-6 col-12-small">
                    <input type="checkbox" id="demo-copy" name="demo-copy" />
                    <label htmlFor="demo-copy">
                      Email me a copy of this message
                    </label>
                  </div>
                  <div className="col-6 col-12-small">
                    <input
                      type="checkbox"
                      id="demo-human"
                      name="demo-human"
                      checked
                    />
                    <label htmlFor="demo-human">
                      I am a human and not a robot
                    </label>
                  </div>
                  <div className="col-12">
                    <textarea
                      name="demo-message"
                      id="demo-message"
                      placeholder="Enter your message"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <ul className="actions">
                      <li>
                        <input
                          type="submit"
                          value="Send Message"
                          className="primary"
                        />
                      </li>
                      <li>
                        <input type="reset" value="Reset" />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>

            <section>
              <h4>Image</h4>
              <h5>Fit</h5>
              <div className="box alt">
                <div className="row gtr-50 gtr-uniform">
                  <div className="col-12">
                    <span className="image fit">
                      <img src="images/fulls/05.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/01.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/02.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/03.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/04.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/05.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/06.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/03.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/02.jpg" alt="" />
                    </span>
                  </div>
                  <div className="col-4">
                    <span className="image fit">
                      <img src="images/thumbs/01.jpg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <h5>Left &amp; Right</h5>
              <p>
                <span className="image left">
                  <img src="images/avatar.jpg" alt="" />
                </span>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt
                felis sagittis eget. tempus euismod. Vestibulum ante ipsum
                primis in faucibus vestibulum. Blandit adipiscing eu felis
                iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent tincidunt felis sagittis eget. tempus
                euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing
                accumsan eu faucibus. Integer ac pellentesque praesent. Donec
                accumsan interdum nisi, quis tincidunt felis sagittis eget.
                tempus euismod. Vestibulum ante ipsum primis in faucibus
                vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque
                praesent tincidunt felis sagittis eget. tempus euismod.
                Vestibulum ante ipsum primis in faucibus vestibulum. Blandit
                adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu
                faucibus. Integer ac pellentesque praesent.
              </p>
              <p>
                <span className="image right">
                  <img src="images/avatar.jpg" alt="" />
                </span>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt
                felis sagittis eget. tempus euismod. Vestibulum ante ipsum
                primis in faucibus vestibulum. Blandit adipiscing eu felis
                iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent tincidunt felis sagittis eget. tempus
                euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing
                accumsan eu faucibus. Integer ac pellentesque praesent. Donec
                accumsan interdum nisi, quis tincidunt felis sagittis eget.
                tempus euismod. Vestibulum ante ipsum primis in faucibus
                vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque
                praesent tincidunt felis sagittis eget. tempus euismod.
                Vestibulum ante ipsum primis in faucibus vestibulum. Blandit
                adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu
                faucibus. Integer ac pellentesque praesent.
              </p>
            </section>
          </section>
        </div>

        <footer id="footer">
          <div className="inner">
            <ul className="icons">
              <li>
                <a href="#" className="icon brands fa-twitter">
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon brands fa-github">
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon brands fa-dribbble">
                  <span className="label">Dribbble</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon solid fa-envelope">
                  <span className="label">Email</span>
                </a>
              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; Untitled</li>
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </>
  );
}

export default Theme;

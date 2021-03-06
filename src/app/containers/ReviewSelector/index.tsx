import * as React from 'react';
import { Button, Input, Grid } from 'semantic-ui-react';
import './style.less';
import {setURL} from 'modules/url';
import { bindActionCreators } from 'redux';
import {IURLConnector} from 'redux/modules/url';
import {Hint} from 'components/Hint';
const { connect } = require('react-redux');
const strings = require('./../../../strings.json');

interface IState {
  enteredBenID?: string;
}

@connect(undefined, (dispatch) => ({
  setURL: bindActionCreators(setURL, dispatch),
}))
class ReviewSelector extends React.Component<IURLConnector, IState> {

  constructor(props) {
    super(props);
    this.state = {};
    this.review = this.review.bind(this);
    this.setBenID = this.setBenID.bind(this);
  }

  private review() {
    const benID = this.state.enteredBenID;
    this.props.setURL(`/review/${benID}`);
  }

  private setBenID(_, data) {
    this.setState({
      enteredBenID: data.value,
    });
  }

  public render() {
    return (
      <Grid container columns={1} >
        <Grid.Column>
          <div id="reviewselector">
            <h1>Review</h1>
            <span className="label"><Hint text={strings.beneficiaryIDExplanation} /><h3>Beneficiary ID</h3></span>
            <Input type="text" placeholder="Beneficiary ID" onChange={this.setBenID}/>
            <Button className="submit" onClick={this.review}>Review</Button>
          </div>
          {this.props.children}
        </Grid.Column>
      </Grid>
    );
  }
}

export { ReviewSelector }

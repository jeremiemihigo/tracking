/* eslint-disable react/prop-types */
import _ from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { differenceDays } from 'static/Lien';
import './action.css';

function Result({ index }) {
  console.log(index);
  console.log(differenceDays(index.dateFin, index.dateDebut));

  const agent = useSelector((state) => state.agent.agent);
  const retournAgent = (id) => {
    return _.filter(agent, { codeAgent: id });
  };
  return (
    <div
      className="result"
      style={
        index.delaiPrevu - differenceDays(index.dateFin, index.dateDebut) >= 0
          ? {
              border: '1px solid black',
              borderRadius: '10px',
              padding: '5px'
            }
          : {
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: 'rgb(233, 196, 196)'
            }
      }
    >
      <p>
        <span>status : </span> {index.status}
      </p>
      <p>
        <span>Role/Agent : </span> {index.role} ; {retournAgent(index.codeAgent)[0]?.nom}
      </p>
      <p style={{ fontWeight: 'bolder', fontSize: '13px' }}>
        <span>old status : </span> {index.action}
      </p>
      <p>
        <span>feedback : </span> {index?.feedbackSelect}
      </p>
      <p>
        <span>comment : </span> {index.commentaire}
      </p>

      <p>
        <span>resolved in : </span> {differenceDays(index.dateFin, index.dateDebut)} jour(s)
        {index.delaiPrevu - differenceDays(index.dateFin, index.dateDebut) > 0 ? '; INSLA' : '; OUTSLA'}
      </p>
      <p>
        <span>deadline : </span> {`${index.delaiPrevu} ${index?.delaiPrevu > 1 ? ' jours' : ' jour'}`}
        <span style={{ float: 'right' }}>{moment(index.createdAt).fromNow()}</span>
      </p>
    </div>
  );
}

export default Result;

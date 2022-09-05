/* eslint-disable */

const IndicatorBtn = (props: { isColor: unknown }) => {
  return (
    <>
      {props.isColor && (
        <button
          className="indicators-btn"
          style={{ backgroundColor: '#88b04b' }}
        ></button>
      )}
      {!props.isColor && <button className="indicators-btn"></button>}
    </>
  )
}

const Indicators = (props: { indicators: Object; toyIndicator: number }) => {
  return (
    <div className="indicators-cont">
      <div className="indicator-toys">
        {props.toyIndicator >= 3 && (
          <img src={require('./images/elephant.png')} alt="" />
        )}
        {props.toyIndicator >= 6 && (
          <img src={require('./images/hipo.png')} alt="" />
        )}
        {props.toyIndicator >= 9 && (
          <img src={require('./images/bear.png')} alt="" />
        )}
        {props.toyIndicator >= 12 && (
          <img src={require('./images/lion.png')} alt="" />
        )}
      </div>
      <div className="indicator-btns">
        {[1, 2, 3].map((el, i) => (
          <IndicatorBtn
            key={i}
            isColor={props.indicators[`${el}` as keyof typeof props.indicators]}
          />
        ))}
      </div>
    </div>
  )
}

export default Indicators

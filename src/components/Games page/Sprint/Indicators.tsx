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

const Indicators = (props: { indicators: Object }) => {
  return (
    <>
      {[1, 2, 3].map((el, i) => (
        <IndicatorBtn
          key={i}
          isColor={props.indicators[`${el}` as keyof typeof props.indicators]}
        />
      ))}
    </>
  )
}

export default Indicators
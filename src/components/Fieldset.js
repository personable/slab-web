import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

// begin styled components
const StyledFieldset = styled.fieldset`
  margin: 0;
  ${(props) =>
    props.layout === "full"
      ? css`
          border-radius: var(--cc_size_border_radius_l);
          border-color: ${props.color
            ? `var(--cc_color_utility_${props.color})`
            : "var(--cc_color_border_default)"};
          border-width: var(--cc_size_border_width_s);
          border-style: solid;
          padding: var(--cc_size_spacing_m);
        `
      : css`
          border: none;
          padding: 0;
        `}
`;
const StyledLegend = styled.legend`
  margin: 0;
  font-weight: 700;
  font-size: var(--cc_size_text_s);
  color: ${(props) =>
    props.color
      ? `var(--cc_color_utility_${props.color})`
      : "var(--cc_color_text_default)"};
  ${(props) =>
    props.layout === "full"
      ? css`
          padding: 0 var(--cc_size_spacing_s);
        `
      : css`
          padding: 0;
          margin-block-end: 12px;
        `}
`;
const Layout = styled.div`
  display: grid;
  grid-gap: var(--cc_size_spacing_s);
  ${(props) =>
    props.layout === "full"
      ? css`
          padding-inline-start: var(--cc_size_spacing_s);
        `
      : css`
          padding: 0;
          margin-block-end: 12px;
        `}
`;
// end styled components

const Fieldset = ({
  children,
  legend,
  color,
  contentBefore,
  contentAfter,
  id,
  layout,
  className,
  style,
  ...props
}) => {
  return (
    <StyledFieldset
      className={className}
      color={color}
      style={style}
      layout={layout}
      id={id}
      aria-describedby={`${contentBefore ? `${id}-contentBefore` : ""} ${
        contentAfter ? `${id}-contentAfter` : ""
      }`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <StyledLegend layout={layout} color={color}>
        {legend}
      </StyledLegend>
      {contentBefore ? (
        <div id={`${id}-contentBefore`}>{contentBefore}</div>
      ) : null}
      <Layout layout={layout}>{children}</Layout>
      {contentAfter ? (
        <div id={`${id}-contentAfter`}>{contentAfter}</div>
      ) : null}
    </StyledFieldset>
  );
};

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired, // id required for accessible error messages
  color: PropTypes.oneOf([undefined, "success", "caution", "destroy"]),
  contentBefore: PropTypes.node,
  contentAfter: PropTypes.node,
  layout: PropTypes.oneOf("compact", "full"),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
Fieldset.defaultProps = {
  contentBefore: undefined,
  contentAfter: undefined,
  color: undefined,
  layout: "compact",
  className: undefined,
  style: undefined
};
export default Fieldset;

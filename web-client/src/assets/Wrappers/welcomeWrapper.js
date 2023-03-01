import styled from "styled-components";

const Wrapper = styled.div`

nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--van-height);
    display: flex;
    align-items: center;


}
.page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top:-3rem;
}
h1 {
    font-weight: 700;
span{
    color:var(--primary-500);
}
}
p {
    color:var(--grey-600);
}
.clear-btn {
        background: var(--grey-500);
    }
    .clear-btn:hover {
        background: var(--black);
    }
    @media (min-width: 992px) {
        .form-center {
        grid-template-columns: 1fr 1fr;
        align-items: center;
        column-gap: 1rem;
        }
        .btn-container {
        margin-top: 0;
        }
    }
    @media (min-width: 1120px) {
        .form-center {
        grid-template-columns: 1fr 1fr 1fr;
        }
        .form-center button {
        margin-top: 0;
        }
    }
`;
export default Wrapper

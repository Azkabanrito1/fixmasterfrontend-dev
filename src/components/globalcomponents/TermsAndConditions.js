import { useState } from "react";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import styled from "styled-components";

const TermsAndConditions = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Container>
      <div className="nav">
        <SiteNavbar
          isOpen={isNavOpen}
          toggleIsOpen={() => {
            setIsNavOpen((prev) => !prev);
          }}
        />
      </div>
      <Terms>
        <h1>Terms And Conditions</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, autem
          earum repudiandae expedita laudantium enim ab, veniam magni corporis
          sapiente hic! Excepturi culpa tempora corrupti, ipsa reiciendis minima
          dolorum repellat necessitatibus eum similique nemo adipisci cum
          dignissimos magni quidem, amet vero autem dolor beatae voluptatum
          optio dolorem. Illum perspiciatis illo omnis harum cumque? Asperiores
          rem nesciunt distinctio quo? Vero cupiditate ut ad, mollitia illo modi
          reprehenderit, omnis, consequuntur vel quidem dolorum dolores nobis
          dolor suscipit iusto. Esse, id facere magnam maxime quia quos fuga
          voluptate quas perspiciatis ipsa dignissimos dicta nihil! Deserunt
          minus accusantium, quod quisquam culpa at tenetur molestiae nobis
          libero voluptatum dignissimos necessitatibus a dolor cupiditate
          doloribus reiciendis? Odit, atque et! Aliquam laborum voluptatem natus
          quis incidunt id doloribus. Nobis soluta assumenda quam quisquam velit
          iusto, reprehenderit voluptatibus, unde maiores optio quaerat
          molestiae sed ad magni aliquid minus, ipsa porro sunt accusantium
          repellat quibusdam odio. Voluptatum error fugiat iure quae corrupti
          recusandae magnam, voluptates doloribus sit temporibus vero culpa!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          nisi nobis sint architecto praesentium nihil magnam officia laborum
          cumque minus? Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Delectus ab est ut quos iste dolores nihil! Et nesciunt ipsa
          perferendis iusto sapiente iure sit, ducimus labore dolorem vitae
          aliquid adipisci ratione fuga enim cumque itaque? Officia, autem
          deleniti eius culpa enim voluptatum, beatae et illum eum veniam
          nostrum inventore, accusantium odit! Blanditiis, facere autem. Porro
          error rerum aspernatur cum, unde magni nesciunt! Explicabo repellendus
          provident possimus cupiditate officia maiores voluptas. Tenetur,
          veniam voluptates! Porro at aut quas, nostrum vitae repudiandae nam
          corrupti ut pariatur laudantium in sapiente totam tempore quos optio
          non dicta eius dolorem voluptatem tenetur alias? Quo, quisquam!
        </p>
      </Terms>
    </Container>
  );
};
export default TermsAndConditions;

const Container = styled.div``;
const Terms = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  gap: 1rem;

  h1 {
    color: var(--clr-primary);
    font-size: 1.6rem;
  }
  p {
    max-width: 780px;
    line-height: 1.8rem;
    letter-spacing: 0.01rem;
  }
`;

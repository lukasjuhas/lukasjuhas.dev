import TextBlock from "./components/TextBlock"
import TextBlockLink from "./components/TextBlockLink"
import LineThrough from "./components/LineThrough"

const Home: React.FC = () => {
  return (
    <div className="flex items-center">
      <TextBlock>
        <p>
          I&apos;m Lukas Juhas, and I&apos;m a citizen of the world. Born and
          raised in Slovakia, started my adult life in the United Kingdom. My
          primary purpose is to enjoy life by{" "}
          <TextBlockLink
            href="https://github.com/lukasjuhas"
            target="_blank"
            rel="noopener noreferrer"
          >
            writing code
          </TextBlockLink>
          ,{" "}
          <TextBlockLink
            href="https://www.goodreads.com/user/show/90882699-lukas-juhas"
            target="_blank"
            rel="noopener noreferrer"
          >
            reading
          </TextBlockLink>
          , travelling, and making pictures.
        </p>

        <p>
          Currently living and working in <LineThrough>London</LineThrough>{" "}
          <LineThrough>Copenhagen</LineThrough> Brooklyn, New York, as an
          Engineer at{" "}
          <TextBlockLink
            href="https://tidal.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TIDAL
          </TextBlockLink>{" "}
          (
          <TextBlockLink
            href="https://block.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Block, Inc
          </TextBlockLink>
          ), working on tools to financially empower artists.
        </p>

        <p>
          Say hello{" "}
          <TextBlockLink href="mailto:dev@lukas.earth">
            dev@lukas.earth
          </TextBlockLink>
          ,{" "}
          <TextBlockLink
            href="https://www.instagram.com/lukasjuhas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @lukasjuhas
          </TextBlockLink>
          .
        </p>
      </TextBlock>
    </div>
  )
}

export default Home

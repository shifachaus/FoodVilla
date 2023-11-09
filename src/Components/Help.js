import { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    <div className="border border-neutral-400 rounded px-4 py-3 m-2 ">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-lg text-neutral-800">{title}</h3>
        <button
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className="cursor-pointer underline"
        >
          {isVisible ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
      </div>

      {isVisible && <p className="text-sm text-neutral-700">{description}</p>}
    </div>
  );
};

const Help = () => {
  const [visibleSection, setIsVisibleSection] = useState("team");
  return (
    <div className=" w-[90%] max-w-4xl my-0 mx-auto mt-28 h-screen">
      <h1 className="text-3xl p-2 mb-6 font-bold text-neutral-800">
        {" "}
        Help & Support
      </h1>
      <Section
        title={"How can I place an order on the app?"}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection === "about"}
        setIsVisible={() =>
          setIsVisibleSection(visibleSection === "about" ? "" : "about")
        }
      />

      <Section
        title={"Can I customize my order to fit my dietary preferences? "}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection === "team"}
        setIsVisible={() =>
          setIsVisibleSection(visibleSection === "team" ? "" : "team")
        }
      />

      <Section
        title={"What payment methods are accepted on the app? "}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection === "payment"}
        setIsVisible={() =>
          setIsVisibleSection(visibleSection === "payment" ? "" : "payment")
        }
      />

      <Section
        title={"How do I track my food delivery? "}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection === "track"}
        setIsVisible={() =>
          setIsVisibleSection(visibleSection === "track" ? "" : "track")
        }
      />

      <Section
        title={
          "What should I do if there's an issue with my order or delivery? "
        }
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection === "issue"}
        setIsVisible={() =>
          setIsVisibleSection(visibleSection === "issue" ? "" : "issue")
        }
      />
    </div>
  );
};

export default Help;

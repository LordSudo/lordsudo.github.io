// Collapsible Code Blocks — toggle disabled, copy button retained

function initCollapsibleCodeBlocks() {
  const postContent = document.querySelector(".post-content-main");
  if (!postContent) return;

  const highlightBlocks = postContent.querySelectorAll(".highlight");

  const standalonePreBlocks = Array.from(postContent.querySelectorAll("pre")).filter(
    (pre) => !pre.closest(".highlight"),
  );

  const codeBlocks = [...highlightBlocks, ...standalonePreBlocks];

  codeBlocks.forEach((block) => {
    let wrapper = block.closest(".code-block-wrapper");
    let isNewWrapper = false;

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      isNewWrapper = true;
    }

    let copyButton = wrapper.querySelector(".code-block-copy");

    if (!copyButton) {
      copyButton = document.createElement("button");
      copyButton.className = "code-block-copy";
      copyButton.setAttribute("aria-label", "Copy code");
      copyButton.innerHTML = `
        <svg class="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="copy-text">Copy</span>
        <span class="copied-text" style="display: none;">Copied!</span>
      `;

      const getCodeText = () => {
        const codeElement = block.querySelector("code") || block;
        return codeElement.textContent || codeElement.innerText || "";
      };

      copyButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        const codeText = getCodeText();
        const isMobile = window.innerWidth <= 768;

        try {
          await navigator.clipboard.writeText(codeText);

          const copyText = copyButton.querySelector(".copy-text");
          const copiedText = copyButton.querySelector(".copied-text");
          const copyIcon = copyButton.querySelector(".copy-icon");
          const checkmarkIcon = copyButton.querySelector(".checkmark-icon");

          copyButton.setAttribute("aria-label", "Code copied");
          copyIcon.style.display = "none";
          checkmarkIcon.style.display = "block";

          if (!isMobile) {
            copyText.style.display = "none";
            copiedText.style.display = "inline";
          }
          copyButton.classList.add("copied");

          setTimeout(() => {
            checkmarkIcon.style.display = "none";
            copyIcon.style.display = "block";
            if (!isMobile) {
              copiedText.style.display = "none";
              copyText.style.display = "inline";
            }
            copyButton.classList.remove("copied");
            copyButton.setAttribute("aria-label", "Copy code");
          }, 2000);

        } catch (err) {
          const textArea = document.createElement("textarea");
          textArea.value = codeText;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
            const copyText = copyButton.querySelector(".copy-text");
            const copiedText = copyButton.querySelector(".copied-text");
            const copyIcon = copyButton.querySelector(".copy-icon");
            const checkmarkIcon = copyButton.querySelector(".checkmark-icon");

            copyIcon.style.display = "none";
            checkmarkIcon.style.display = "block";

            if (!isMobile) {
              copyText.style.display = "none";
              copiedText.style.display = "inline";
            }
            copyButton.classList.add("copied");
            copyButton.setAttribute("aria-label", "Code copied");

            setTimeout(() => {
              copyIcon.style.display = "block";
              checkmarkIcon.style.display = "none";
              if (!isMobile) {
                copyText.style.display = "inline";
                copiedText.style.display = "none";
              }
              copyButton.classList.remove("copied");
              copyButton.setAttribute("aria-label", "Copy code");
            }, 2000);
          } catch (fallbackErr) {
            console.error("Failed to copy code:", fallbackErr);
          }
          document.body.removeChild(textArea);
        }
      });

      wrapper.insertBefore(copyButton, wrapper.firstChild);
    }

    if (isNewWrapper) {
      const content = document.createElement("div");
      content.className = "code-block-content";
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(content);
      content.appendChild(block);
    }
  });
}

(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsibleCodeBlocks);
  } else {
    initCollapsibleCodeBlocks();
  }
})();
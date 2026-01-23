<script setup>

</script>

<style lang="scss">
    #contact-card {
        background-color: var(--vp-c-bg-soft);

        a {
            text-decoration: none;
            color: var(--vp-c-text-1);

            &:hover {
                color: var(--vp-c-brand-1);
            }
        }

        #contact-card-name {
            margin: 0;
        }

        #separator {
            background-color: var(--vp-c-divider);
        }

        #link-block {
            div {
                border-color: var(--vp-c-bg);
                background-color: var(--vp-c-bg);

                p {
                    margin: 0;
                }

                &:hover {
                    border-color: var(--vp-c-brand-1);
                }

                .icon {
                    background-color: currentColor;
                    color: inherit;
                    mask: var(--icon) no-repeat;
                    mask-size: 100% 100%;
                    width: 20px;
                    height: 20px;
                    fill: currentColor;

                    &#resume-icon {
                        --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 13q1.45 0 2.475-1.025T15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15t-3.863.763T5 17.85z'/%3E%3C/svg%3E");
                    }

                    &.icon-arrow {
                        --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-7-7l7 7l-7 7'/%3E%3C/svg%3E");
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="text-center">
        <h2 id="card-header">
            <span class="block text-sm mb-2 font-medium">Here's my card.</span>
            Let's Connect
        </h2>
    </div>
    <div id="contact-card" class="mx-auto mt-5 p-6 max-w-3xl flex flex-col sm:flex-row items-center rounded-xl justify-stretch">
        <div id="profile-block" class="w-50 min-w-40 flex flex-col items-center">
            <div class="">
                <img src="/assets/profile_pic.png" alt="Profile Picture of Alex Hirota">
            </div>
            <div class="text-center">
                <p id="contact-card-name" class="text-base font-semibold">Alex Hirota</p>
                <a class="text-sm no-underline" href="mailto:avjhirota@gmail.com">avjhirota@gmail.com</a>
            </div>
        </div>
        <div id="separator" class="block h-px sm:h-auto w-full sm:w-px my-4 self-stretch sm:my-0 sm:mx-6"></div>
        <div id="link-block" class="flex flex-col gap-3 w-full self-stretch">
            <a class="grow" href="https://www.linkedin.com/in/alex-hirota/" target="_blank">
                <div class="rounded-xl px-6 py-3 h-full flex items-center border">
                    <span class="icon mr-1" style="--icon: url('https://api.iconify.design/simple-icons/linkedin.svg');"></span>
                    LinkedIn
                </div>
            </a>
            <a class="grow" href="https://github.com/ahirota" target="_blank">
                <div class="rounded-xl px-6 py-3 h-full flex items-center border">
                    <span class="icon mr-1" style="--icon: url(https://api.iconify.design/simple-icons/github.svg);"></span>
                    Github
                </div>
            </a>
            <a class="grow" href="/resume.pdf" target="_blank" rel="noreferrer">
                <div class="rounded-xl px-6 py-3 h-full flex items-center border">
                    <span id="resume-icon" class="icon mr-1"></span>
                    Resume
                </div>
            </a>
        </div>
    </div>
</template>
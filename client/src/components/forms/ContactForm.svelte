<script lang="ts">
    import Button from "@components/shared/client/Button.svelte";
    import Input from "@components/shared/client/Input.svelte";
    import TextArea from "@components/shared/client/TextArea.svelte";
    import { getPropertyName } from "@utils/object.ts";

    const submitData = {
        name: {
            value: "",
            hasError: true
        },
        email: {
            value: "",
            hasError: true
        },
        subject: {
            value: "",
            hasError: true
        },
        message: {
            value: "",
            hasError: true
        }
    };

    type SubmitDataKey = keyof typeof submitData;

    function handleSubmitDataForKey(e: CustomEvent, key: SubmitDataKey) {
        const detail = e.detail;

        if (!detail) {
            submitData[key].value = "";
            submitData[key].hasError = true;
            return;
        }

        submitData[key].value = detail.value ?? "";
        submitData[key].hasError = Array.isArray(detail.errors) && detail.errors.length > 0;
    }

    function handleNameChange(e: CustomEvent) {
        handleSubmitDataForKey(e, getPropertyName(submitData, x => x.name) as SubmitDataKey);
    }

    function handleEmailChange(e: CustomEvent) {
        handleSubmitDataForKey(e, getPropertyName(submitData, x => x.email) as SubmitDataKey);
    }

    function handleSubjectChange(e: CustomEvent) {
        handleSubmitDataForKey(e, getPropertyName(submitData, x => x.subject) as SubmitDataKey);
    }

    function handleMessageChange(e: CustomEvent) {
        handleSubmitDataForKey(e, getPropertyName(submitData, x => x.message) as SubmitDataKey);
    }

    const handleSubmit = (e: SubmitEvent) => {
        if (Object.values(submitData).some(x => x.hasError)) {
            return;
        }

        // TODO: Submit data to server
        console.log(Object.values(submitData).map(x => x.value));
    };

    const submitButtonLabel = "Submit";
</script>

<div class="flex flex-col gap-4">
    <p><i>Please fill the details below and click the "{submitButtonLabel}" button:</i></p>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4 flex flex-col gap-4">
            <Input
                label="Name"
                placeholder="Enter name..."
                value={submitData.name.value}
                required
                displayErrors
                on:change={handleNameChange}
            />

            <Input
                label="Email"
                placeholder="Enter email address..."
                value={submitData.email.value}
                type="email"
                min={5}
                max={320}
                required
                displayErrors
                on:change={handleEmailChange}
            />

            <Input
                label="Subject"
                placeholder="Enter email subject..."
                value={submitData.subject.value}
                required
                displayErrors
                on:change={handleSubjectChange}
            />

            <TextArea
                label="Message"
                placeholder="Enter your message..."
                value={submitData.message.value}
                rows={8}
                required
                displayErrors
                on:change={handleMessageChange}
            />
        </div>

        <Button
            label={submitButtonLabel}
            type="submit"
            icon="mdi:email-send-outline"
            iconPosition="right"
            disabled={Object.values(submitData).some(x => x.hasError)}
        />
    </form>
</div>

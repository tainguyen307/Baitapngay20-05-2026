const cron = require("node-cron");
const Order = require("../models/order");

const startOrderCron = () => {
    // chạy mỗi phút
    cron.schedule("* * * * *", async () => {
        try {
            const thirtyMinutesAgo =
                new Date(
                    Date.now() - 30 * 60 * 1000
                );

            // auto confirm
            const result =
                await Order.updateMany(
                    {
                        status: "NEW",
                        createdAt: {
                            $lte:
                                thirtyMinutesAgo
                        }
                    },
                    {
                        $set: {
                            status:
                                "CONFIRMED"
                        }
                    }
                );

            if (
                result.modifiedCount >
                0
            ) {
                console.log(
                    `[CRON] Auto confirmed ${result.modifiedCount} orders`
                );
            }
        } catch (error) {
            console.error(
                "Order cron error:",
                error.message
            );
        }
    });

    console.log(
        "Order cron started"
    );
};

module.exports =
    startOrderCron;